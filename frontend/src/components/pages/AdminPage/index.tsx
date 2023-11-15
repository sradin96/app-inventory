import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateItem from "../CreateItem";
import CreateEvent from "../CreateEvent";
import AllItems from "../AllItems";
import './styles.scss'

type RouteConfig = {
  path: string;
  component: React.FC;
	name: string,
};

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);

  const routes: RouteConfig[] = [
    { path: '/admin-stranica/svi-proizvodi', name: 'Svi Proizvodi', component: AllItems },
    { path: '/admin-stranica/nov-proizvod', name: 'Nov Proizvod', component: CreateItem },
    { path: '/admin-stranica/nov-dogadjaj', name: 'Nov Dogadjaj', component: CreateEvent },
  ];

  useEffect(() => {
    const currentRouteIndex = routes.findIndex((route) => route.path === location.pathname);
    setSelectedRouteIndex(currentRouteIndex !== -1 ? currentRouteIndex : null);
  }, [location.pathname, routes]);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="admin-page">
			<div className="admin-page__holder">
				<aside className="admin-page__aside">
					<ul className="admin-page__aside-list">
						{routes.map(({ path, name }) => (
							<li key={path} className="admin-page__aside-item">
								<Link to={path} onClick={() => handleItemClick(path)}>
									{name}
								</Link>
							</li>
						))}
					</ul>
				</aside>
				<div className="admin-page__container">
					{selectedRouteIndex !== null && React.createElement(routes[selectedRouteIndex].component)}
				</div>
			</div>
    </div>
  );
};

export default AdminPage;
