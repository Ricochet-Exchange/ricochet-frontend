import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/routes';
export const InvestNav = () => (
  <div className="flex items-center md:items-start text-center md:text-left md:flex-col md:w-64 p-7 border-r">
    <NavLink className="mb-2 mr-2 md:mr-0 py-2 px-4 rounded-full bg-gray-100" exact activeClassName="bg-blue-100 text-blue-400" to={Routes.Invest}>Markets</NavLink>
    <NavLink className="mb-2 mr-2 md:mr-0 py-2 px-4 rounded-full bg-gray-100" activeClassName="bg-blue-100 text-blue-400" to={Routes.InvestLiquidityMarkets}>Liquidity Markets</NavLink>
    <NavLink className="mb-2 mr-2 md:mr-0 py-2 px-4 rounded-full bg-gray-100" activeClassName="bg-blue-100 text-blue-400" to={Routes.InvestLaunchpads}>Launchpads</NavLink>
  </div>
)