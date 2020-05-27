import React, {useMemo, useState} from 'react'
import classnames from 'classnames'

import styles from './index.less'

class Adjoin {
  constructor(vertexs) {
    this.vertexs = vertexs
    this.quantity = vertexs.length
    this.init()
  }

  init() {
    // 创建全部为0（没有关联）的矩阵数组
    this.adjoinVertex = new Array(this.quantity * this.quantity).fill(0)
  }

  // 设置定点向下关联
  setVertexRelative(id, sides) {
    const idIndex = this.vertexs.findIndex(item => item === id)
    sides.forEach(side => {
      const sideIndex = this.vertexs.findIndex(item => item === side)
      this.adjoinVertex[this.quantity * sideIndex + idIndex] = 1
    });
  }

  // 获取一列数据
  getVertexCol(id) {
    let col = []
    const idIndex = this.vertexs.findIndex(item => item === id)
    this.vertexs.forEach((item, index) => {
      col[index] = (this.adjoinVertex[this.quantity * index + idIndex])
    })
    return col
  }

  // 返回关联的顶点
  getVertexRelative(id) {
    return this.getVertexCol(id).map((item, index) => !!item?this.vertexs[index]:item).filter(Boolean)
  }

  // 计算所选取列的和作为一列
  getColTotal(vertexs) {
    const allCols = vertexs.map(id => this.getVertexCol(id))
    let result = []
    this.vertexs.forEach((item, index) => {
      const colsTotal = allCols.map(ite => ite[index]).reduce((total, current) => total += current, 0)
      result[index] = colsTotal
    })
    return result
  }

  // 获取所有有关联顶点的点的集合，并集
  getCollection(vertexs) {
    return this.getColTotal(vertexs).map((item, index) => !!item?this.vertexs[index]: item).filter(Boolean)
  }

  // 获取所有跟所有顶点有关联的点的集合，交集
  getUnions(vertexs) {
    return this.getColTotal(vertexs).map((item, index) => item >= (vertexs.length)?this.vertexs[index]: item).filter(Boolean)
  }

}

class ShopAdjoin extends Adjoin {
  constructor({commoditySpecs, data}) {
    super(commoditySpecs.reduce((total, current) => ([...total, ...current.list]), []))
    this.commoditySpecs = commoditySpecs
    this.data = data
    this.initCommodity()
    this.initSiblingCommodity()
  }

  // 创建关联
  initCommodity() {
    this.data.map(item => item.specs).forEach(ite => {this.applyCommodity(ite)})
  }

  // 同级关联
  initSiblingCommodity() {
    const allOptional = this.getCollection(this.vertexs)
    this.commoditySpecs.forEach(({list}) => {
      this.applyCommodity(list.filter(ite => (allOptional.indexOf(ite) > -1)))
    })
  }

  // 创建关联
  applyCommodity(goods) {
    goods.forEach(item => {
      this.setVertexRelative(item, goods)
    })
  }

  queryOptionalGoods(goods) {
    if(goods.some(Boolean)) {
      return this.getUnions(goods.filter(Boolean))
    } else {
      return this.getCollection(this.vertexs)
    }
  }

}

export default function index(props) {
  const {
    commoditySpecs, 
    data,
  } = props 

  const [specsS, setSpecsS] = useState(new Array(commoditySpecs.length).fill(0))

  const onClick = (optional, value, index) => {
    if(!optional) return 
    specsS[index] = specsS[index] === value? 0 : value
    setSpecsS([...specsS])
  }

  const shopAdjoin = useMemo(() => new ShopAdjoin({commoditySpecs, data}), [commoditySpecs, data])

  const optionalGoods = shopAdjoin.queryOptionalGoods(specsS)
  
  return (
    <div className={styles.container}>
      {
        commoditySpecs.map(({title, list}, index) => {
          return <div key={index}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.list}>
              {
                list.map((item) => {
                return <span
                  className={classnames({
                    [styles.item]: true,
                    [styles.optional]: optionalGoods.indexOf(item) > -1,
                    [styles.actived]: specsS.indexOf(item) > -1
                  })}
                  onClick={() => {onClick(optionalGoods.indexOf(item) > -1, item, index)}}
                >{item}</span>
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}
