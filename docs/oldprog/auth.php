<?php
header('Content-Type: text/html; charset=utf-8');
// Авторизация
$users["hanss"] = array("password"=>"cash123"  , "cashaccount"=>"4cb873379b39e82a3d16e0f4082dd916");
$users["vika" ] = array("password"=>"Vikaust11", "cashaccount"=>"bb05c9194d05b6ef2da180cccac121fe");

if (isset($_REQUEST ["action"]) && $_REQUEST ["action"]=='logOut')
{
	logout();
	die('До свидания!');
}

$realm = 'Please enter a valid Username and Password';

if (empty($_SERVER['PHP_AUTH_DIGEST'])) {
	header('Content-Type: text/html; charset=utf-8');
	header('HTTP/1.1 401 Unauthorized');
	header('WWW-Authenticate: Digest realm="'.$realm.'",qop="auth",nonce="'.uniqid().'",opaque="'.md5($realm).'"');

	die('Необходимо ввести имя пользователя и пароль для работы с программой');
}


// анализируем переменную PHP_AUTH_DIGEST
if (!($data = http_digest_parse($_SERVER['PHP_AUTH_DIGEST'])) ||
!isset($users[$data['username']]["password"]))
	die('Не верные имя пользователя или пароль');

// генерируем корректный ответ
$A1 = md5($data['username'] . ':' . $realm . ':' . $users[$data['username']]["password"]);
$A2 = md5($_SERVER['REQUEST_METHOD'].':'.$data['uri']);
$valid_response = md5($A1.':'.$data['nonce'].':'.$data['nc'].':'.$data['cnonce'].':'.$data['qop'].':'.$A2);

if ($data['response'] != $valid_response)
	die('Не верные имя пользователя или пароль');

// функция разбора заголовка http auth
function http_digest_parse($txt)
{
	// защита от отсутствующих данных
	$needed_parts = array('nonce'=>1, 'nc'=>1, 'cnonce'=>1, 'qop'=>1, 'username'=>1, 'uri'=>1, 'response'=>1);
	$data = array();
	$keys = implode('|', array_keys($needed_parts));

	preg_match_all('@(' . $keys . ')=(?:([\'"])([^\2]+?)\2|([^\s,]+))@', $txt, $matches, PREG_SET_ORDER);

	foreach ($matches as $m) {
		$data[$m[1]] = $m[3] ? $m[3] : $m[4];
		unset($needed_parts[$m[1]]);
	}

	return $needed_parts ? false : $data;
}

function logout(){
	unset($_SERVER["PHP_AUTH_DIGEST"]);
    header('HTTP/1.1 401 Unauthorized');
    return true;
}
