<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'], // Add '*' to apply to all routes

    'allowed_methods' => ['*'],
    
    'allowed_origins' => [
        'http://127.0.0.1:8000',
        'http://localhost:8000',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://[::1]:5173',
        'http://[::1]:8000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Change to true for Inertia
];