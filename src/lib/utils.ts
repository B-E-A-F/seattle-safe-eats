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

export function restaurauntNameToUrl(name: string, id: string) {
	return `${name
		.toLowerCase()
		.replace(/[^a-zA-Z0-9 ]/g, '')
		.replace(/\s+/g, '-')}-${id.substring(2)}`;
}
