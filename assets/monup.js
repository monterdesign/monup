jQuery(document).ready(function ($) {
    // Tạo popup khi click #monlogin
    $('a[href="#monlogin"]').on('click', function (e) {
        e.preventDefault();

        if ($('#monup-overlay').length === 0) {
            const loggedIn = monup_data.is_user_logged_in;
            const content = loggedIn ? `
    <div class="monup-logged-in">
        <div class="monup-welcome-icon">👋</div>
        <div class="monup-welcome-text">
            <p>Xin chào, <strong>${monup_data.user_name}</strong>!</p>
            <a class="monup-logout-btn" href="${monup_data.logout_url}">Đăng xuất</a>
        </div>
    </div>
            ` : `
                <div class="monup-tabs">
                    <button class="monup-tab-btn active" data-tab="login">Đăng nhập</button>
                    <button class="monup-tab-btn" data-tab="register">Đăng ký</button>
                </div>
                <div class="monup-tab-content" id="monup-login">
                    <input type="email" placeholder="Email" id="monup-login-email">
                    <input type="password" placeholder="Mật khẩu" id="monup-login-password">
                    <button id="monup-login-btn">Đăng nhập</button>
                    <div class="monup-message" id="monup-login-msg"></div>
                </div>
                <div class="monup-tab-content" id="monup-register" style="display:none;">
                    <input type="text" placeholder="Họ tên *" id="monup-reg-name">
                    <input type="email" placeholder="Email *" id="monup-reg-email">
                    <input type="password" placeholder="Mật khẩu *" id="monup-reg-password">
                    <button id="monup-register-btn">Đăng ký</button>
                    <div class="monup-message" id="monup-register-msg"></div>
                </div>
            `;

            $('body').append(`
                <div id="monup-overlay">
                    <div id="monup-popup">
                        <span id="monup-close">&times;</span>
                        <div class="monup-content">${content}</div>
                    </div>
                </div>
            `);
        }

        $('#monup-overlay').fadeIn(200);
    });

    // Đóng popup
    $(document).on('click', '#monup-overlay', function (e) {
        if ($(e.target).is('#monup-overlay, #monup-close')) {
            $('#monup-overlay').fadeOut(200, function () {
                $('#monup-overlay').remove();
            });
        }
    });

    // Đổi tab
    $(document).on('click', '.monup-tab-btn', function () {
        $('.monup-tab-btn').removeClass('active');
        $(this).addClass('active');
        const tab = $(this).data('tab');
        $('.monup-tab-content').hide();
        $('#monup-' + tab).show();
    });

    // Xử lý đăng nhập
    $(document).on('click', '#monup-login-btn', function () {
        const email = $('#monup-login-email').val();
        const password = $('#monup-login-password').val();
        $('#monup-login-msg').text('Đang xử lý...');

        $.post(monup_data.ajax_url, {
            action: 'monup_login',
            email: email,
            password: password
        }, function (response) {
            $('#monup-login-msg').text(response.data);
            if (response.success) {
                window.location.href = monup_data.redirect_url;
            }
        });
    });

    // Xử lý đăng ký
    $(document).on('click', '#monup-register-btn', function () {
        const name = $('#monup-reg-name').val();
        const email = $('#monup-reg-email').val();
        const password = $('#monup-reg-password').val();
        $('#monup-register-msg').text('Đang xử lý...');

        $.post(monup_data.ajax_url, {
            action: 'monup_register',
            name: name,
            email: email,
            password: password
        }, function (response) {
            $('#monup-register-msg').text(response.data);
        });
    });
});
