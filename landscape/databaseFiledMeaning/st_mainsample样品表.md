# st_mainsample

样品表，待测样品，检测因子表

所有的待测样品ID，包含平行样品，加标样品，空白样
## MainSampleID
主键
## PickSampleID
## BottleID

凭ID

## SecondCode

分析表单上的样品编号

## QCType

样品类型，示例值：1，代表普通样品。



| 样品代码 | 样品类型     | 表                               |
| -------- | ------------ | -------------------------------- |
| 1        | 普通样品     |                                  |
| 2        | 室外平行     |                                  |
| 3        | 室外空白     |                                  |
| 9        | 室内平行样   | ST_MainSample_QC_Paralel         |
| 10       | 室内空白样   | ST_MainSample_QC_Blank           |
| 11       | 室内加标样   | ST_MainSample_QC_AddedSpecimen   |
| 12       | 室内标准物质 | ST_MainSample_QC_StandardControl |



## Item

项目名称

## ItemID

项目名称ID

## \*InspectType

分析类型

## TakeMan
## TakeDate
## MaxDayDate
## MaxDaysToSubmitResult
## ExpiredDate
## SampleBatchID

样品所属批次ID

## AnalysisBatchID
## SubSampleDate
## StandardVolume

标准体积

## StandardConditionID
## StandardConditionName
## StandardLimit
## IsQualified
## DurationMinute
## ProjectID

此样品属于哪个Project任务

## PickID
## ExceedingRate
## IsAssistAnalyse
## IsKnowOnAnalyse
## ItemSampleRemark
## JobDutyID
## LabSelfCode
## SortNoInBatch

在批次中的序号，某些批次样品需要放在前面。

## StandardSettingJson
## VirtualQc2ShareMainID
## OS_ProjectID
## IsOutsourced
## PackMainID
## PackMainItem
## StandardConditionID_Loose
## StandardConditionName_Loose
## StandardLimit_Loose
## StandardSettingJson_Loose
## ExecuteStandardType
## ChatID
## ReceivedSampleBatchID
## IsCM
## IsRead
## CoopID
新业务协同id
## IsInvisible
## UUID
## \*MainStatus
监测因子流转状态,1 分析中 ， 2 复核中 ， 3 审核中 ， 4报告编写 ， 5 回退，6暂停，9完结

## isdelete
## MonitorSitePlace
## SampleID















