export type Route = {
	path: string,
	isPublic: boolean,
	isAdmin?: boolean,
	content: JSX.Element[] | JSX.Element,
	nestedContent? : []
	exact?: boolean
}

export type ItemType = {
	id: number,
	name: string;
  brand: string;
  description: string;
  quantity: number;
  price: number;
  discountPrice: number;
  image?: File[] | null;
}

export type User = {
	id: number | undefined;
  username: string;
  email: string;
  phone?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  zipcode?: number | undefined;
}