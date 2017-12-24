/* eslint-disable */
import Error404 from '../Error404';

test('Error404', async () => {
	const error = new Error404('404 error');
	expect(error.code).toBe(404);
	expect(error.status).toBe(404);
	expect(error.message).toBe('404 error');
});
