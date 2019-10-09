Наличные Паша 4cb873379b39e82a3d16e0f4082dd916
Наличные Вика bb05c9194d05b6ef2da180cccac121fe

#httpd.conf
Alias /gcash "C:/Users/Hanss/Work/gcash"

<Directory "C:/Users/Hanss/Work/gcash">
	Options Indexes FollowSymLinks Includes ExecCGI
	AllowOverride All
	Order allow,deny
	Allow from all
	Require all granted
</Directory>