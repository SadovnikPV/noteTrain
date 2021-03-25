<!DOCTYPE html>
<head>
	<title> Тренажер музыкального слуха </title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
	<meta name="description" content="" />
	<meta http-equiv="Content-Language" content="ru">
	<meta name="robots" content="index, follow" />
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<script type="text/javascript" src="js/jquery3.5.1.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>

	<div id = "page_wrap">
		<div id = "header">
			Тренажер музыкального слуха
		</div>

		<div id = "guitarNeck">
		</div>
		<div id ="noteControlMenu">
			<input class = "cbInput" type = "checkbox" checked id = "octave0" onchange = "showHideOctave('octave0')"> Малая октава
			<input class = "cbInput" type = "checkbox" checked id = "octave1" onchange = "showHideOctave('octave1')"> Первая октава
			<input class = "cbInput" type = "checkbox" checked id = "octave2" onchange = "showHideOctave('octave2')"> Вторая октава
			<input class = "cbInput" type = "checkbox" checked id = "octave3" onchange = "showHideOctave('octave3')"> Третья октава
		</div>
		<div id = "startTestBlock">
			<div class = "button" onclick="startTest()">
				Пройти тест
			</div>
		</div>
		<div id = "settingsTest">
			Нажмите на ноты, которые хотите добавить в тест. Или добавьте октаву полностью:
			<div class = "divRow">
				<div class = "octaveButton" onclick = "selectOctave('0')">
					Малая октава
				</div>
				<div class = "octaveButton" onclick = "selectOctave('1')">
					Первая октава
				</div>
				<div class = "octaveButton" onclick = "selectOctave('2')">
					Вторая октава
				</div>
				<div class = "octaveButton" onclick = "selectOctave('3')">
					Третья октава
				</div>
			</div>
			<div class = "button" onclick = "testNote()">
				Начать тест
			</div>
			<div></div>
		</div>
		<div id = "testNoteBlock">
		</div>
	</div>
	<script> noteNeck(); </script>

</body>
</html>

