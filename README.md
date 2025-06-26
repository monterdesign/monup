=== MonUp - Popup Login & Register ===
Contributors: monsterdesign  
Tags: login, register, popup, ajax login, custom registration, modal form  
Requires at least: 5.0  
Tested up to: 6.5  
Requires PHP: 7.2  
Stable tag: 2.0  
License: GPLv2 or later  
License URI: https://www.gnu.org/licenses/gpl-2.0.html  

A lightweight plugin to display login and registration forms in a popup modal triggered by #monlogin. Supports AJAX form handling, user approval by admin, and user-friendly design.

== Description ==

MonUp is a simple yet powerful plugin designed to enhance user interaction on your WordPress site. It allows users to log in or register using a modern popup interface triggered by clicking on a link with the `#monlogin` hash.

**Features:**

- Clean, modern popup UI for login and registration
- Login and registration forms via AJAX (no page reload)
- User registration uses email as username
- New users are created with `pending` status for admin approval
- Customizable form styles and content
- Automatically closes the popup after login
- Compatible with most WordPress themes and page builders
- Lightweight and developer-friendly

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory or install it via the WordPress admin panel.
2. Activate the plugin through the ‘Plugins’ menu in WordPress.
3. Add a link anywhere in your theme or content with `href="#monlogin"` to trigger the popup.

Example:
```html
<a href="#monlogin">Login/Register</a>
