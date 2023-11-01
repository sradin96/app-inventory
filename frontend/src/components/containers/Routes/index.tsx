import { Route, Routes } from 'react-router-dom'
import { routes } from '../../../routes'

const AppRoutes = () => {
	return (
		<Routes>
			{routes.map(({ path, isPublic, content }) => {
				// DO AUTHROUTE / PROTECTED ROUTES

        // return isPublic ? (
        //   <Route key={path} path={path} element={content} />
        // ) : (
        //   <Route
        //     key={path}
        //     path={path}
        //     element={content}
        //   />
        // );
				return <Route key={path} path={path} element={content} />
      })}
		</Routes>
	)
}

export default AppRoutes
