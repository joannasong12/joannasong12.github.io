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
	const refresh = document.querySelector('.refresh');

	let currentList = [];


	mainForm.addEventListener('submit', async (submitEvent) => {
		submitEvent.preventDefault();
		console.log('form submission');

		const results = await fetch('https://data.princegeorgescountymd.gov/resource/jkwh-e4vd.json');

		currentList = await results.json();
		localStorage.setItem("storedData", JSON.stringify(currentList));
		const storedData = localStorage.getItem("storedData");
    	let parsedData = JSON.parse(storedData);
		console.log(parsedData);
	});

	refresh.addEventListener('click', async (submitEvent) =>{
		console.log('clicked refresh')

		localStorage.clear();
		
		const results = await fetch('https://data.princegeorgescountymd.gov/resource/jkwh-e4vd.json');

		currentList = await results.json();
		localStorage.setItem("storedData", JSON.stringify(currentList));
		const storedData = localStorage.getItem("storedData");
    	let parsedData = JSON.parse(storedData);
		console.log(parsedData);
	});

	function initChart (myData, myLabels, formProps){
		if(myChart){
			myChart.destroy();
		}
		
		const ctx = document.getElementById('myChart');
		
		myChart = new Chart(ctx, {
			
		  type: 'bar',
		  data: {
			labels: myLabels,
			datasets: [{
			  label: 'Racial Distribution for ' + formProps.tract,
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
	}
	
	let myChart;

	createChart.addEventListener('click', (event) => {
		console.log('clicked createChart button');

		const formData = new FormData(mainForm);
		const formProps = Object.fromEntries(formData);

		console.log(formProps);


		currentTract = currentList.find((item) => item.tract_id == formProps.tract);

		myData = [
				currentTract.black,
				currentTract.hispanic,
				currentTract.white,
				currentTract.asian,
				currentTract.pacific_is
			];

		myLabels = ['black', 'hispanic', 'white', 'asian', 'pacific islander'];

		initChart(myData, myLabels, formProps);
	})
  }
  document.addEventListener('DOMContentLoaded', async () => mainEvent());

  