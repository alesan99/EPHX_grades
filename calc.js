/*
So, to answer your question: yes, when using the geometric mean, low grades will have a more pronounced effect on the overall grade,
making it potentially lower compared to using the arithmetic mean, which treats all grades equally.
The geometric mean can be useful when you want to penalize extreme low values or outliers, such as in financial calculations
or when dealing with data that has a multiplicative relationship.
However, it may not always be suitable for grading, as it can unfairly impact students who have a single low score in an otherwise strong performance.
*/

// Find geometric mean of 7 units
function geometric_mean(nums) {
	let product = 1;
	for (let i = 0; i < nums.length; i++) {
		let value = nums[i];
		product *= value;
	}
	return product ** (1 / nums.length);
}

// Match to right letter grade
function letter_check(score) {
	let letters = ["A", "B", "C", "D", "Fail"];
	let thresholds = [89.5, 79.5, 69.5, 59.5, 0.0];
	for (let i = 0; i < thresholds.length; i++) {
		let threshold = thresholds[i];
		if (score >= threshold) {
			return letters[i];
		}
	}
}

var grades = [
	90, // 'kinematics': 0,
	60, // 'energy': 0,
	50, // 'oscillatory_motion': 0,
	50, // 'newton': 0,
	50, // 'momentum': 0,
	50, // 'thermodynamics': 0,
	100, // 'test_prep': 0,  # ~144 chances; 100 max
];
var extra_credit = 3; // / 3 percent points

function validate(id) {
    let userInput = document.getElementById(id).value;
	
    // Check if the input is a valid number
    if (!isNaN(userInput) && userInput !== "") {
		return parseFloat(userInput);
    } else {
		return 0;
	}
}

function generate_grade_array() {
	for (let row = 0; row < 6; row++) {
		let score1 = validate("q" + (row+1) + "n1");
		let score2 = validate("q" + (row+1) + "n2");
		let score3 = validate("q" + (row+1) + "n3");
		let largest = Math.max(score1,score2,score3);
		let secondLargest = 0.000000001;
		let sameLargest = 0.000000001;
		
		for (let i = 0; i < 3; i++) {
			let score = validate("q" + (row+1) + "n" + (i+1));
			if (score == largest) {
				sameLargest += 1;
			}
			if (score > secondLargest && (score < largest || sameLargest >= 2)) {
				secondLargest = score;
			}
		}

		let quiz_grade = largest+secondLargest;
		let test_grade = validate("t" + (row+1));

		let max = Math.max(quiz_grade, test_grade);
		grades[row] = max;
		//window.alert(grades[row]);
	}

	grades[6] = validate("testPrep");
	extra_credit = validate("extraCredit");
}

function calculate_grade() {
	// Get the user input from the input field
	generate_grade_array()

	var final_grade = geometric_mean(grades) + extra_credit;
	var letter_grade = letter_check(final_grade);
	
	// Display the result on the page
	document.getElementById('grade').textContent = "Grade: " + final_grade.toFixed(2) + "% (" + letter_grade + ")";

	
	const failimage = document.getElementById("failImage");
	const goodimage = document.getElementById("goodImage");
	if (failimage && goodimage) {
		if (letter_grade == "A" || letter_grade == "B" || letter_grade == "C") {
			failimage.style.display = "none";
			goodimage.style.display = "";
		} else {
			failimage.style.display = "";
			goodimage.style.display = "none";
		}
	}
}

function jumpToNextInput(event, nextInputId) {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent the default behavior (form submission)

		// Find the next input element by its ID
		const nextInput = document.getElementById(nextInputId);

		if (nextInput) {
			nextInput.focus(); // Set focus to the next input field
		}
	} else if (event.key == "Backspace") {
		
	}
}