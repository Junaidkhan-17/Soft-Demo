import { redirect } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

export function loader({ request }: LoaderFunctionArgs) {
  return redirect('/home-1');
}

export default function Index() {
  return null;
}
