import React from 'react'
import { Row } from '../components/InsertRow'
const MainWrapper = ({ children, title, opt }) => {
  return (
    <Row
      opt={{
        isBoxed: opt.isBoxed,
        classes:
          opt && opt.classes
            ? opt.classes + ' main-wrapper container-transparency'
            : 'main-wrapper container-transparency',
        alignTo: 'left',
        title: title,
        bgColor: opt.bgColor,
      }}
    >
      {children}
    </Row>
  )
}

export default MainWrapper
