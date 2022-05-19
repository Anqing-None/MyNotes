# mt_projectitem
一个任务（project）包含多个检测项目，此表记录一个任务中的所有检测项目。

例子：在任务单中指定了检测项目，会将所有检测项目保存到此表。

## ProjectItemID

主键

## ProjectID
项目ID，对应表mt_project
## InspectType
检测大类，示例值：水（含大气降水）和废水
```sql
SELECT DISTINCT INSPECTTYPE from setting_analysisitemabbreviation;

INSPECTTYPE
水（含大气降水）和废水
环境空气和废气
土壤、水系沉积物
噪声和振动
电离辐射
电磁辐射
空气和废气(含降水)
机动车尾气
燃料
固体废物
```
## InspectSubType
检测小类，示例值：地表水
## MonitorPlace
采样点位名称，示例值：珠江大桥
## MonitorPlaceCount
采样点位数量，示例值：1
## InspectItems
检测项目名称，使用英文分号隔开，示例值:氨氮;甲醛;氰化物;挥发酚
## InspectItemIDs
检测项目ID，使用英文分号隔开，示例值10;70;361;260
查表
## FrequencyDescption
## MonitorAmountPerDay
## TotalDays
## Mem
## AccumulateTime
## StandardConditionID
## PlaceType
## InspectTypeID
## NeedLabToPrePare
## PlanPickBottleCount
## PlanMinHandOverDate
## PlanMaxHandOverDate
## SubManagers
## Facility
## ExhaustFunnelNo
## SpotCount
## SectionShape
## MonitorSize
## StandardConditionName
## PreservationCondition
## QCType
## Odour
## Color
## Appearance
## PickContainer
## PickTime
## PickStaff
## SampleStatus
## SampleVolume
## SampleCode
## AnalyseItems
## AnalyseItemsIDs
## ZSProjectID
## FrequencyDayIndex
