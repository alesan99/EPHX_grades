'''
So, to answer your question: yes, when using the geometric mean, low grades will have a more pronounced effect on the overall grade,
making it potentially lower compared to using the arithmetic mean, which treats all grades equally.
The geometric mean can be useful when you want to penalize extreme low values or outliers, such as in financial calculations
or when dealing with data that has a multiplicative relationship.
However, it may not always be suitable for grading, as it can unfairly impact students who have a single low score in an otherwise strong performance.
'''

import math
import numpy as np

def mean(nums):
	return np.mean(nums)

def geometric_mean(nums):
	product = 1
	for value in nums:
		product *= value
	return product ** (1 / len(nums))

def letter_check(score):
	letters = ["A", "B", "C", "D", "Fail"]
	thresholds = [89.5, 79.5, 69.5, 59.5, 0.0]
	for i, threshold in enumerate(thresholds):
		if score >= threshold:
			return letters[i]

grades = [
	90, # 'kinematics': 0,
	60, # 'energy': 0,
	50, # 'oscillatory_motion': 0,
	50, # 'newton': 0,
	50, # 'momentum': 0,
	50, # 'thermodynamics': 0,
	100, # 'test_prep': 0,  # ~144 chances; 100 max
]
extra_credit = 3 # / 3 percent points

final_grade = geometric_mean(grades) + extra_credit
print(final_grade, letter_check(final_grade))