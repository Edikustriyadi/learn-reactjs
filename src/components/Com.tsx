export default function Com() {
	function onTest() {
		alert("test");
	}
	return (
		<div>
			<a href="#" onClick={onTest}>
				Test
			</a>
		</div>
	);
}
