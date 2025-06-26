<?php
/*
Plugin Name: MonUp - Popup Login & Register
Description: Hiển thị popup đăng nhập và đăng ký khi click vào #monlogin.
Version: 2.1
Author: Monster Design
*/

// Enqueue CSS & JS
add_action('wp_enqueue_scripts', 'monup_enqueue_assets');
function monup_enqueue_assets() {
    wp_enqueue_style('monup-style', plugin_dir_url(__FILE__) . 'assets/monup.css');
    wp_enqueue_script('monup-script', plugin_dir_url(__FILE__) . 'assets/monup.js', array('jquery'), null, true);

    wp_localize_script('monup-script', 'monup_data', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'is_user_logged_in' => is_user_logged_in(),
        'user_name' => is_user_logged_in() ? wp_get_current_user()->display_name : '',
        'logout_url' => wp_logout_url(site_url($_SERVER['REQUEST_URI'])),
        'redirect_url' => site_url($_SERVER['REQUEST_URI'])
    ));
}

// Đăng ký role "pending"
add_action('init', function () {
    if (!get_role('pending')) {
        add_role('pending', 'Pending Approval', array('read' => true));
    }
});

// AJAX: xử lý đăng ký
add_action('wp_ajax_nopriv_monup_register', 'monup_handle_register');
function monup_handle_register() {
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $password = $_POST['password'];

    if (!is_email($email)) {
        wp_send_json_error('Email không hợp lệ.');
    }
    if (email_exists($email)) {
        wp_send_json_error('Email đã được sử dụng.');
    }

    $userdata = array(
        'user_login' => $email,
        'user_email' => $email,
        'user_pass'  => $password,
        'first_name' => $name,
        'role'       => 'pending'
    );

    $user_id = wp_insert_user($userdata);
    if (is_wp_error($user_id)) {
        wp_send_json_error('Không thể tạo tài khoản.');
    }

    wp_send_json_success('Đăng ký thành công! Vui lòng đợi quản trị kích hoạt.');
}

// AJAX: xử lý đăng nhập
add_action('wp_ajax_nopriv_monup_login', 'monup_handle_login');
function monup_handle_login() {
    $creds = array(
        'user_login' => $_POST['email'],
        'user_password' => $_POST['password'],
        'remember' => true
    );
    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        wp_send_json_error('Thông tin đăng nhập không đúng.');
    }

    if (in_array('pending', (array) $user->roles)) {
        wp_logout();
        wp_send_json_error('Tài khoản của bạn đang chờ kích hoạt.');
    }

    wp_send_json_success('Đăng nhập thành công.');
}
