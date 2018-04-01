<?php

namespace App\Http\Controllers\Api;

use JWTAuth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AuthController extends BaseController
{


    public function login(Request $request)
    {

        \Log::info('AuthController@login', [$request->all()]);

        // grab some user
        $remember = $request->input('remember', false);

        try {
            // grab credentials from the request
            $credentials = $this->_parseDataFromRequest($request);

            // attempt to verify the credentials and create a token for the user
            $token = JWTAuth::attempt($credentials);

            if (!$token) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            $user = JWTAuth::toUser($token);

            $customClaims = ['user' => $user->toArray()];

            if ($remember) {

                $expiration = Carbon::now($user->time_zone)->addDay(2)->getTimestamp();
                $customClaims['exp'] = $expiration;

            } else {

                $expiration = Carbon::now($user->time_zone)->addMinutes(config('jwt.ttl'))->getTimestamp();
                $customClaims['exp'] = $expiration;

            }

            \Log::info('Created JWT from data: ', [$customClaims]);
            $token = JWTAuth::fromUser($user, $customClaims);


        } catch (JWTException $e) {

            \Log::info('AuthController@login - JWTException', [$e->getMessage()]);

            return response()->json(['error' => 'invalid_credentials'], 401);
        } catch (\Exception $e) {
            \Log::info('AuthController@login - Exception', [$e->getMessage()]);

            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }

    protected function _parseDataFromRequest(Request $request)
    {
        $credentials = [];

        if ($request->has('email')) {
            $credentials['email'] = $request->input('email');
            $credentials['password'] = $request->input('password');
        } else {
            $params = $request->header('Authorization');

            if (!$params) {
                return $credentials;
            }

            $params = explode(':', base64_decode(explode(' ', $params)[1]));

            if (!isset($params[0]) || !isset($params[1])) {
                return false;
            }

            $credentials['email'] = $params[0];
            $credentials['password'] = $params[1];
        }

        return $credentials;
    }
}
