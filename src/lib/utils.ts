import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function gradeToText(grade: string) {
	switch (grade) {
		case '1':
			return 'Excellent';
		case '2':
			return 'Good';
		case '3':
			return 'Okay';
		case '4':
			return 'Needs to improve';
		default:
			return 'N/A';
	}
}
