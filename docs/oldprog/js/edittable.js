/**
 * 
 */
$(document)
		.ready(
				function() {
					// при нажатии на ячейку таблицы с классом edit
					$('td.edit').click(
							function() {
								// находим input внутри элемента с классом ajax
								// и
								// вставляем вместо
								// input его значение
								$('.ajax').html($('.ajax input').val());
								// удаляем все классы ajax
								$('.ajax').removeClass('ajax');
								// Нажатой ячейке присваиваем класс ajax
								$(this).addClass('ajax');

								window.oldvalue = $(this).text();

								// внутри ячейки создаём input и вставляем текст
								// из
								// ячейки в него
								$(this).html(
										'<input id="editbox" size="'
												+ $(this).text().length
												+ '" value="' + $(this).text()
												+ '" type="text">');
								// устанавливаем фокус на созданном элементе
								$('#editbox').focus();
							});

					// определяем нажатие кнопки на клавиатуре
					$('td.edit').keydown(
							function(event) {
								// получаем значение класса и разбиваем на
								// массив
								// в итоге получаем такой массив - arr[0] =
								// edit, arr[1]
								// =
								// наименование столбца, arr[2] = id строки
								arr = $(this).attr('class').split(" ");
								// проверяем какая была нажата клавиша и если
								// была
								// нажата клавиша
								// Enter (код 13)
								if (event.which == 13) {
									// получаем наименование таблицы, в которую
									// будем
									// вносить
									// изменения
									var table = $(this).closest('table').attr('id'); //$('table').attr('id');
									// выполняем ajax запрос методом POST
									$.ajax({
										type : "POST",
										// в файл update_cell.php
										url : "update_cell.php",
										// создаём строку для отправки запроса
										// value = введенное значение
										// id = номер строки
										// field = название столбца
										// table = собственно название таблицы
										data : "value="
												+ $('.ajax input').val()
												+ "&id=" + arr[2] + "&field="
												+ arr[1] + "&table=" + table,
										// при удачном выполнении скрипта,
										// производим
										// действия
										success : function(data) {
											// находим input внутри элемента с
											// классом
											// ajax и
											// вставляем вместо input его
											// значение
											$('.ajax').html(
													$('.ajax input').val());
											// удаялем класс ajax
											$('.ajax').removeClass('ajax');
										}
									});
								}
							});

					$(document).on('blur', '#editbox', function() {
						$('.ajax').html(window.oldvalue);
						$('.ajax').removeClass('ajax');
					});

					$(function() {

						$('#dialog').dialog({
							/*buttons : [ {
								text : "OK",
								click : addDataToTable
							} ],*/
							modal : true,
							autoOpen : false,
							width : 340
						});

						$('#show').button().click(function() {
						    $('#dialog').dialog({
								buttons: [{text: "OK", click: addDataToTable },
						                  {text: "Отмена", click: function() {$(this).dialog("close");}}]
							});
							$('#account').val('');
							$('#description').val('');
							$('#value').val('');
							$('#dialog').dialog("open");
							$('#account').focus();
						});
						
						//autocomplete
						$("#description").autocomplete({
							source: "discription_search.php",
							minLength: 1
						});				

						/*
						 * Добавление новой проводки
						 */
						function addDataToTable() {
							var current_account = $('#current_account').val();
							var account = $('#account').val();
							var description = $('#description').val();
							var account_type = $('#account_type').val();
							var value = $('#value').val().replace(/\,/, ".");
							if (account_type == "EXPENSE")
								value = -Math.abs(value);
							else
								value = Math.abs(value);
							var today = new Date();
							today.setDate(today.getDate() - 1);
							today.setHours(20, 0, 0);

							var guid = generateUUID();

							// выполняем ajax запрос методом POST
							$
									.ajax({
										type : "POST",
										// в файл add_transaction_cell.php
										url : "add_transaction.php",
										// создаём строку для отправки запроса
										// account = номер корреспондирующего
										// счета
										// description = комментарии к проводке
										// value = сумма проводки (положительная
										// или
										// отрицательная)
										data : "current_account=" + current_account
												+ "&account=" + account
												+ "&guid="    + guid
												+ "&today="	  + today.toMysqlFormat()
												+ "&description=" + description
												+ "&value=" + value,
										// при удачном выполнении скрипта,
										// производим
										// действия
										success : function(data) {
											today.setDate(today.getDate() + 1);
											$(
													'<tr id="'+ guid +'"><td>'
															+ today
																	.toLocaleDateString()
															+ '</td><td class="edit description '
															+ guid + '">'
															+ description
															+ '</td><td>'
															+ value
															+ '</td>'
															+ '<td>'
															+ ' <button class="editDep"><img src="images/edit.png" class="editImg" alt="Редактировать"></button>'
															+ '</td>'
															+ '<td>'
															+ ' <button class="deleteDep"><img src="images/delete.png" class="deleteImg" alt="Удалить"></button>'
															+ '</td>'
															+ '<td style="display:none">'
															+ account
															+ '<td>'
															+ '</td></tr>'
				
											
											).prependTo('#transactions tbody');
											$('#total_by_current').html(eval(data));
										}
									});

							$('#dialog').dialog("close");

						}

					});

					/* Генерация гуида */
					function generateUUID() {
						var d = new Date().getTime();
						var uuid = '000000xxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
								/[xy]/g, function(c) {
									var r = (d + Math.random() * 16) % 16 | 0;
									d = Math.floor(d / 16);
									return (c == 'x' ? r : (r & 0x7 | 0x8))
											.toString(16);
								});
						return uuid;
					}

					/**
					 * Работа с датами You first need to create a formatting
					 * function to pad numbers to two digits…
					 */
					function twoDigits(d) {
						if (0 <= d && d < 10)
							return "0" + d.toString();
						if (-10 < d && d < 0)
							return "-0" + (-1 * d).toString();
						return d.toString();
					}

					/**
					 * …and then create the method to output the date string as
					 * desired. Some people hate using prototypes this way, but
					 * if you are going to apply this to more than one Date
					 * object, having it as a prototype makes sense.
					 */
					Date.prototype.toMysqlFormat = function() {
						return this.getUTCFullYear() + "-"
								+ twoDigits(1 + this.getUTCMonth()) + "-"
								+ twoDigits(this.getDate()) + " "
								+ twoDigits(this.getHours()) + ":"
								+ twoDigits(this.getMinutes()) + ":"
								+ twoDigits(this.getSeconds());
					};
					
					/*
					 * Удаление строки таблицы
					 * */
					$('body').on('click', 'button.deleteDep', function() {
						if (!confirm("Хотите удалить проводку?")) return;
						var row  = $(this).parent().parent();
						var trId = row.attr("id");
						var current_account = $('#current_account').val();

						// выполняем ajax запрос методом POST
						$
								.ajax({
									type : "POST",
									// в файл add_transaction_cell.php
									url : "remove_transaction.php",
									// создаём строку для отправки запроса
									data : "current_account=" + current_account
										 + "&guid=" + trId,
									// при удачном выполнении скрипта,
									// производим
									// действия
									success : function(data) {
										$('#total_by_current').html(eval(data));
										row.remove();
									}
								});

					});
					
					
					/*
					 * Редактирование строки таблицы
					 */
					$('body').on('click', 'button.editDep', function() {
						var row  = $(this).parent().parent();
						var trId = row.attr("id");
						$('#description').val($(row.children('td')[1]).text().trim());
						$('#account').val($(row.children('td')[5]).text().trim());
						$('#value').val($(row.children('td')[2]).text().trim());

					    $('#dialog').dialog({
							buttons: [{
								text: "OK", click: function() {
									var current_account = $('#current_account').val();
									var account = $('#account').val();
									var description = $('#description').val();
									var account_type = $('#account_type').val();
									var value = $('#value').val().replace(/\,/, ".");
									if (account_type == "EXPENSE")
										value = -Math.abs(value);
									else
										value = Math.abs(value);


									// выполняем ajax запрос методом POST
									$
											.ajax({
												type : "POST",
												// в файл add_transaction_cell.php
												url : "upd_transaction.php",
												// создаём строку для отправки запроса
												// account = номер корреспондирующего
												// счета
												// description = комментарии к проводке
												// value = сумма проводки (положительная
												// или
												// отрицательная)
												data : "current_account=" +  current_account 
														+ "&account="      + account
														+ "&guid=" + trId 
														+ "&description=" + description
														+ "&value=" + value,
												// при удачном выполнении скрипта,
												// производим
												// действия
												success : function(data) {
													$(row.children('td')[1]).html(description);
													$(row.children('td')[2]).html(value);
													$(row.children('td')[5]).html(account);
													$('#total_by_current').html(eval(data));
												}
											});
									
									$(this).dialog("close");
								}},
					            {text: "Отмена", click: function() {$(this).dialog("close");}}]
						});
					    $('#dialog').dialog("open");
						$('#account').focus();
					});
					
				});

/*
 * Заполнение списка
 */
function fillAccounts_list(account_type){
    $.ajax({
        type: "POST",
        url: "accounts_list.php",
        data: { account_type: account_type},
        cache: false,
        //success: function(responce){ $('#account_list_holder').html(responce); }
        success: function(responce){ $('#account').html(responce); }
    });
};

function change_account_list() {
    var cb = document.getElementById('if_income_or_expense');
    if (cb.checked){
    	fillAccounts_list('EXPENSE');
    	$('#account_type').val('EXPENSE');
    }
    else{
    	fillAccounts_list('INCOME');
    	$('#account_type').val('INCOME');
    }
}

function toggle_account_tree() {
	if ($("#tree").is(":hidden")) {
		//$('#tree').load('accounts_tree.php');
		$("#container").width(800);
		$("#tree").show("fast");
	} else {
		$("#container").width(600);
		$("#tree").hide("fast");
	}
	return false;
}

function click_tree (clicked_value){
	//$('#current_account').val(clicked_value);
	window.location = 'index.php?current_account='+clicked_value;
	//alert(clicked_value);
	//$('#content)
}
