import React from 'react'
import { Link } from 'gatsby'
const AccessibilityBlock = () => (
  <>
    <Link
      data-trackable="a11y-skip-to-help"
      className="non-layout"
      to="/accessibility"
    >
      Acessibilidade Primeiro
    </Link>
    <Link
      data-trackable="a11y-skip-to-navigation"
      className="non-layout"
      to="/#site-navigation"
    >
      Ir para o menu de navegação
    </Link>
    <Link
      data-trackable="a11y-skip-to-content"
      className="non-layout"
      to="/#site-content"
    >
      Ir para o conteúdo
    </Link>
    <Link
      data-trackable="a11y-skip-to-footer"
      className="non-layout"
      to="/#site-footer"
    >
      Ir para informações de rodapé
    </Link>
  </>
)

export default AccessibilityBlock
