function filterList(list, query){
	return list.filter((item) => {
	  const lowerCaseName = item.name.toLowerCase();
	  const lowerCaseQuery = query.toLowerCase();
	  return lowerCaseName.includes(lowerCaseQuery);
	})
  }


  async function mainEvent() {
	const mainForm = document.querySelector('.main_form');
	const filterButton = document.querySelector('.filter_button');

	let currentList = [];

	mainForm.addEventListener('submit', async (submitEvent) => {
		submitEvent.preventDefault();
		console.log('form submission');

		const results = await fetch('https://data.princegeorgescountymd.gov/resource/jkwh-e4vd.json');

		currentList = await results.json();
		console.table(currentList);
	});

	filterButton.addEventListener('click', (event) => {
		console.log('clicked FilterButton');

		const formData new FormData(mainForm);
		const formProps = Object.fromEntries(formData);

		console.log(formProps);
		const newList = filterList(currentList, formProps.tract);
		console.log(newList);
	})
  }

  document.addEventListener('DOMContentLoaded', async () => mainEvent());