import React from "react";
import { Link } from "gatsby";
import { RiShoppingBag3Line } from "react-icons/ri";
const MainMenuList = ({
  list,
  indx,
  isMobile,
  handleRefState,
  userIcon,
  refState,
  bagIcon,
  hanburguerIcon,
}) => {
  if (list.item.href) {
    return (
      <li key={indx} role='none'>
        <a
          href={list.item.href}
          role={isMobile ? "menuitem" : null}
          itemProp='url'
          title={list.item.label}
          aria-label={`Acesso a página: ${list.item.label}, fora do websítio da EMPRESA`}
        >
          {list.item.label}
        </a>
      </li>
    );
  }
  if (list.item.to) {
    return (
      <li key={indx} role='none'>
        <Link
          to={list.item.to}
          role={isMobile ? "menuitem" : null}
          itemProp='url'
          title={list.item.label}
          aria-label={`Acesso a página: ${list.item.label}, no websítio da EMPRESA`}
          activeClassName='active'
          className='uzum'
        >
          {list.item.label}
        </Link>
      </li>
    );
  }
  // if (list.item.icon) {
  //   return (
  //     <li className='menu-shop-bag' key={indx} role='none'>
  //       {bagIcon}
  //     </li>
  //   );
  // }
  if (list.item.search_widget) {
    return (
      <li className='main-menu-search' key={indx}>
        {/* <Layout
          type="SEARCH"
          opt={{
            placeholder: list.item.search_label,
            searchStringBase: list.item.search_url_prefix,
          }}
        /> */}
      </li>
    );
  }
  if (isMobile) {
    return (
      <div className='header-columns toggle-menu'>
        <p className='menu-shop-bag-mobile'>{userIcon}</p>
        <p className='menu-shop-bag-mobile' tabIndex='-1'>
          <RiShoppingBag3Line />
        </p>
        <button
          type='button'
          id='check-toggle-icon'
          onClick={handleRefState}
          aria-haspopup='true'
          aria-controls='mainmenu'
          aria-expanded={refState}
          aria-label='Alternar visibilidade do menu'
          className={`menu-wrapper menu-bar-icon  ${
            refState ? "active" : "not-active"
          }`}
        >
          {hanburguerIcon}
        </button>
      </div>
    );
  }
  return null;
};
export default MainMenuList;
