export default `
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><%- title %></title>
</head>

<body>
	<div id="root"><%- markup -%></div>
	<script src="bundle.js"></script>
</body>

</html>
`.trim();