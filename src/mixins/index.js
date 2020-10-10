//性别
export const sex = {
  data() {
    return {
      sexList: [{
          name: "男",
          id: 1
        },
        {
          name: "女",
          id: 2
        }
      ]
    }
  }
}

export const type = {
  data() {
    return {
      typeList: [{
        name: "老师",
        id: 1
      }, {
        name: "班主任",
        id: 2
      }]
    }
  }
}

export const schoolType = {
  data() {
    return {
      schoolTypeList: [{
          name: "公办",
          id: 0
        },
        {
          name: "私立",
          id: 1
        },
        {
          name: "民办",
          id: 2
        }
      ]
    }
  }
}

export const relation = {
  data() {
    return {
      relationList: [{
          name: "妈妈",
          id: 1
        },
        {
          name: "爸爸",
          id: 2
        },
        {
          name: "爷爷",
          id: 3
        },
        {
          name: "奶奶",
          id: 4
        },
        {
          name: "外公",
          id: 5
        },
        {
          name: "外婆",
          id: 6
        }
      ]
    }
  }
}

//栏目优先级
export const priority = {
  data() {
    return {
      priorityList: [{
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ],
    }
  }
}

//栏目属性
export const scrollType = {
  data() {
    return {
      scrollTypeList: [{
          name: "非滚动",
          value: 0
        },
        {
          name: "滚动",
          value: 1
        }
      ],
    }
  }
}

//栏目有效期
export const validType = {
  data() {
    return {
      validTypelist: [{
          name: "长期",
          value: 0
        },
        {
          name: "自定义",
          value: 1
        }
      ]
    }
  }
}

//账号类型
export const accountType = {
  data() {
    return {
      typeList: [{
          id: 0,
          name: "促进会"
        },
        {
          id: 1,
          name: "学校"
        },
        {
          id: 2,
          name: "教育局"
        },
        {
          id: 3,
          name: "培训机构"
        }
      ],
    }
  }
}


//设备状态
export const device = {
  data() {
    return {
      deviceStatus: [{
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "故障"
        },
        {
          value: 2,
          label: "正常关机"
        }
      ]
    }
  }
}

//内容属性
export const contentProperty = {
  data() {
    return {
      contentPropertyList: [{
          value: 0,
          label: "原创"
        },
        {
          value: 1,
          label: "摘要"
        }
      ],
    }
  }
}

//展示形式
export const contentTemplate = {
  data() {
    return {
      contentTemplateList: [{
          value: 3,
          label: "纯图片"
        },
        {
          value: 4,
          label: "上视频下图片"
        },
        {
          value: 5,
          label: "上图片下视频"
        },
        {
          value: 6,
          label: "门户网站"
        }
      ],
    }
  }
}

//审核状态
export const verifyStatus = {
  data() {
    return {
      verifyStatusList: [{
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "审核通过"
        },
        {
          value: 2,
          label: "审核不通过 "
        }
      ]
    }
  }
}

//学校性质
export const property = {
  data() {
    return {
      propertyidList: [{
          id: 1,
          name: "公立"
        },
        {
          id: 2,
          name: "私立"
        },
        {
          id: 3,
          name: "民办"
        }
      ]
    }
  }
}

//学校类型
export const typeid = {
  data() {
    return {
      typeidList: [{
          id: 1,
          name: "学龄前"
        },
        {
          id: 2,
          name: "小学"
        },
        {
          id: 3,
          name: "初中"
        },
        {
          id: 4,
          name: "高中"
        },
        {
          id: 5,
          name: "大学"
        },
        {
          id: 6,
          name: '培训机构'
        },
        {
          id: 7,
          name: '其他'
        }
      ]
    }
  }
}

//作品类型
export const worksType = {
  data() {
    return {
      worksTypeList: [{
          id: 0,
          name: "全部"
        }, {
          id: 1,
          name: "学生作品"
        },
        {
          id: 2,
          name: "班级风采"
        },
        {
          id: 3,
          name: "精选优品"
        }
      ]
    }
  }
}
//审核阶段
export const checkStage = {
  data() {
    return {
      checkStageList: [{
          id: 9,
          name: "全部 "
        }, {
          id: 0,
          name: "待审核 "
        },
        {
          id: 1,
          name: "审核完成 "
        }
      ]
    }
  }
}
//审核阶段2
export const checkStages = {
  data() {
    return {
      checkStageLists: [{
          id: 0,
          name: "待审核"
        },
        {
          id: 1,
          name: "审核完成"
        },
        {
          id: 2,
          name: "审核不通过"
        }
      ]
    }
  }
}

export const classType = {
  data() {
    return {
      classType: [{
          id: 0,
          name: '正式班'
        },
        {
          id: 1,
          name: '模拟班'
        },
        {
          id: 2,
          name: '示范班'
        }
      ]
    }
  }
}

export const classTypeList = {
  data() {
    return {
      classType: [{
          text: "中小学",
          classtype: 1
        },
        {
          text: "幼儿园",
          classtype: 2
        },
        {
          text: "培训机构",
          classtype: 3
        },
        {
          text: "其他",
          classtype: 4
        }
      ]
    }
  }
}


export const class_code = {
  data() {
    return {
      classCodeList: [{
          text: "1班",
          value: 1
        },
        {
          text: "2班",
          value: 2
        },
        {
          text: "3班",
          value: 3
        },
        {
          text: "4班",
          value: 4
        },
        {
          text: "5班",
          value: 5
        },
        {
          text: "6班",
          value: 6
        },
        {
          text: "7班",
          value: 7
        },
        {
          text: "8班",
          value: 8
        },
        {
          text: "9班",
          value: 9
        },
        {
          text: "10班",
          value: 10
        },
        {
          text: "11班",
          value: 11
        },
        {
          text: "12班",
          value: 12
        },
        {
          text: "13班",
          value: 13
        },
        {
          text: "14班",
          value: 14
        },
        {
          text: "15班",
          value: 15
        },
      ]
    }
  }
}
