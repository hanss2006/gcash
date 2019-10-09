<html>
<head>
<meta charset=utf-8>
<title>Учет денежных средств</title>
<meta name="description"
	content="Веб приложение для базы данных учета денежных средств" />
<meta name="keywords" content="Gnucash" />
<meta name="author" content="Pavel Grudanov" />

<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.4.min.js"></script>
<script type="text/javascript" src="js/edittable.js"></script>
<script type="text/javascript" src="dbtreeview/treeview.js"></script>
<link rel="stylesheet" href="css/jquery-ui-1.10.4.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="dbtreeview/treeview.css" type="text/css" media="screen"/>
</head>
<body>
			<div id="dialog" title="Введите данные" class="ui-widget">
				<input type="hidden" id="current_account" value="<?=$current_account?>">
				<input type="hidden" id="account_type" value="<?=$account_type?>">
				<div>
					<label for="if_income_or_expense">Расход: </label> <input
						type='checkbox' checked="checked" id='if_income_or_expense'
						onchange='change_account_list();' />
				</div>

				<div id="account_list_holder" class="ui-widget">
					<label for="combobox">Счет: </label> <select id="account">
						<option value="cf9b4a026b99ba7ca0a7c873a7e34b91" selected="selected">
							Выбрать...
						</option>
						<?php foreach ($accounts as $account) { ?>
							<option value="<?=$account['guid']?>"><?=$account['name']?></option>
						<? } ?>
					</select>
				</div>

				<div>
					<label for="description">Описание: </label><br /> <input
						id="description" />
				</div>
				<div>
					<label for="value">Стоимость: </label><br /> <input id="value" />
				</div>
			</div>


	<div id="container">
		<div id="header">
			<div id="loginas">Вы вошли как: <?=$username ?>.
				<a href="?action=logOut">Выйти</a>
			</div>
			<button id="show">Добавить проводку</button>

			<label for="total_by_current">Остаток:</label>
			<span id="total_by_current"><?php echo $total_by_current ?></span>
		</div>

		<div id="navigation">
			<?=$pager->print_pager()?>
		</div>

		<div id="menu">
			<a href="javascript://" onclick="return toggle_account_tree();">v</a>
			<div id="tree"><?php echo $tree ?></div>
		</div>
		
		<div id="content">
			<table id="transactions" class="ui-widget">
			<?php  $c = 0; foreach ($transactions as $transaction) { ?>
				<tr id="<?=$transaction['guid']?>"	class="<?=($c++%2==1) ? 'odd' : 'even' ?>">
					<td>
						<?=$transaction['enter_date']?>
					</td>
					<td class="edit description <?=$transaction['guid']?>"><?=$transaction['description']?></td>
					<td>
						<?=$transaction['value_num']?>
					</td>
					<td>
						<?=($transaction['editable'] ? '<button class="editDep"><img src="images/edit.png" class="editImg" alt="Редактировать"></button>' : '')?>
					</td>
					<td>
						<?=($transaction['editable'] ? '<button class="deleteDep"><img src="images/delete.png" class="deleteImg" alt="Удалить"></button>' : '')?>
					</td>
					<td style="display: none">
						<?=$transaction['cred_acc']?>
					</td>
				</tr>
			<? } ?>
			</table>
		</div>

		<div id="footer"></div>
	</div>

</body>
</html>
