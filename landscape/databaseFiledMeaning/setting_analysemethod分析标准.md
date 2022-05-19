# setting_analysemethod

分析方法设置表，记录所有分析标准

## methodID

分析标准ID，主键。一个检测标准对应一个ID。

## MethodName

标准名称，示例值：“水质 汞、砷、硒、铋和锑的测定 原子荧光法”

## AccordName

国家标准的编号，示例值：HJ 694-2014。HJ 694-2014一一对应标准名称。

## Type

分析项目类型，大类，示例值：水（含大气降水）和废水

此字段与Setting_InspectType表中的InspectBasicType对应，见[Setting_InspectType](Setting_InspectType检测项目类别分类.md/#InspectBasicType)

## UseFor

示例值：1;2;3，表示可用于现场采样、样品分析、前处理方法

方法的具体用途，1：现场采样2：样品分析3：前处理方法

## IsRemoved

## PickRecord

## SeriaNo

## SeriaNoSort

## IsAbolish

方法是否被废除。

## replaceWay

方法更新情况，如果方法被替代，此字段会记录新的方法ID（methodID），用户可以查询到最新方法。





















