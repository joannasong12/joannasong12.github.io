function filterList(list, query){
	return list.filter((item) => {
	  const lowerCaseName = item.name.toLowerCase();
	  const lowerCaseQuery = query.toLowerCase();
	  return lowerCaseName.includes(lowerCaseQuery);
	})
  }


  async function mainEvent() {
	const mainForm = document.querySelector('.main_form');
	const createChart = document.querySelector('.create_chart');

	let currentList = [];

	mainForm.addEventListener('submit', async (submitEvent) => {
		submitEvent.preventDefault();
		console.log('form submission');

		const results = await fetch('https://data.princegeorgescountymd.gov/resource/jkwh-e4vd.json');

		currentList = await results.json();
		console.table(currentList);
	});

	createChart.addEventListener('click', (event) => {
		console.log('clicked createChart button');

		const formData = new FormData(mainForm);
		const formProps= Object.fromEntries(formData);

		console.log(formProps);
	})
  }
  document.addEventListener('DOMContentLoaded', async () => mainEvent());