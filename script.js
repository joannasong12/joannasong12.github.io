function filterList(list, query){
	return list.filter((item) => {
	  const lowerCaseName = item.name.toLowerCase();
	  const lowerCaseQuery = query.toLowerCase();
	  return lowerCaseName.includes(lowerCaseQuery);
	})
  }


  let myData = [];
  let myLabels = [];
  async function mainEvent() {
	const mainForm = document.querySelector('.main_form');
	const createChart = document.querySelector('.create_chart');

	let currentList = [];


	mainForm.addEventListener('submit', async (submitEvent) => {
		submitEvent.preventDefault();
		console.log('form submission');

		const results = await fetch('https://data.princegeorgescountymd.gov/resource/jkwh-e4vd.json');

		currentList = await results.json();
		console.log(currentList);
	});




	createChart.addEventListener('click', (event) => {
		console.log('clicked createChart button');

		function removeData(myChart) {
			myChart.data.labels.pop();
			myChart.data.datasets.forEach((myData) => {
				dataset.data.pop();
			});
			myChart.update();
		}

		const formData = new FormData(mainForm);
		const formProps = Object.fromEntries(formData);

		console.log(formProps);

		debugger;
		currentTract = currentList.find((item) => item.tract_id == formProps.tract);

		myData = [
				currentTract.black,
				currentTract.hispanic,
				currentTract.white,
				currentTract.asian,
				currentTract.pacific_is
			];

		myLabels = ['black', 'hispanic', 'white', 'asian', 'pacific islander'];

		const ctx = document.getElementById('myChart');
		
		new Chart(ctx, {
		  type: 'bar',
		  data: {
			labels: myLabels,
			datasets: [{
			  label: '# of Votes',
			  data: myData,
			  borderWidth: 1
			}]
		  },
		  options: {
			scales: {
			  y: {
				beginAtZero: true
			  }
			}
		  }
		});


	})
  }
  document.addEventListener('DOMContentLoaded', async () => mainEvent());

  