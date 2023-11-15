import { Route, Routes } from 'react-router-dom'
import { routes } from '../../../routes'
import AuthRoute from '../AuthRoute';
import { useContext } from 'react';
import { ThemeContext } from '../../../store/theme-context';

const AppRoutes = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<main className={`main${theme === 'dark' ? ' main--dark' : ''}`}>
			<Routes>
				{routes.map(({ path, isPublic, isAdmin, content, nestedContent, exact }) => {
					return isPublic ? (
						<Route {...(exact && { exact: true })} key={path} path={path} element={content} />
					) : (
						<Route
							key={path}
							path={path}
							element={<AuthRoute isAdmin={isAdmin}>
									{content}
								</AuthRoute>}
							{...(exact && { exact: true })}
						>
							{nestedContent?.map(({ path, content }) => (
								<Route {...(exact && { exact: true })} key={path} path={path} element={content} />
							))}
						</Route>
					);
				})}
			</Routes>
		</main>
	)
}

export default AppRoutes
