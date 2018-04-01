<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" ng-app="platform">
    <head>
        <base href="{{env('APP_BASE')}}/dashboard/"/>

        <title>{{env('APP_NAME')}} - Dashboard</title>

        <meta charset=utf-8>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" media="all" href="{{env('ASSETS_PATH')}}{{ elixir('css/dashboard.css') }}">
        <link rel="stylesheet" media="all" href="{{env('ASSETS_PATH')}}{{ elixir('css/app.css') }}">

        <!-- use ie -->
<!--        <script src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>-->

    </head>
    <body>
        <div>

            <a ng-href="loggout._href" ng-show="loggout._show"> Loggout </a>

        </div>
        <div id="layout">

            <div class="page-view" ng-view></div>

        </div>

        <script type="text/javascript" src="{{env('ASSETS_PATH')}}{{ elixir('js/app.js') }}"></script>

        <script type="text/javascript" src="{{env('ASSETS_PATH')}}{{ elixir('js/templates.js') }}"></script>
        <script type="text/javascript" src="{{env('ASSETS_PATH')}}{{ elixir('js/app.templates.js') }}"></script>
        <script type="text/javascript" src="{{env('ASSETS_PATH')}}{{ elixir('js/dashboard.js') }}"></script>

    </body>
</html>