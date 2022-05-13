## setting_analyseitemparams

分析项目（元素）的参数表，主要包含

分析表单ID（AnalyseFormID）: 1506

分析项目名称（ItemName）："总锌"

分析项目类别的子类（InspectSubType）： "废水;地表水;地下水"

分析项目大类（InspectTypes）： "水（含大气降水）和废水"

标准方法ID（MethodID）：543，标准方法对应表[setting_analysemethod](./setting_analysemethod分析标准.md)

（InspectTypes）

各字段释义如下：

### AnalyseItemParamsID

主键，记录分析参数id

### AnalysisItemID

分析项目的ID，一个项目对应一个id，如铜对应307，总铜对应468

### MethodID

分析标准方法的ID，对应数据表setting_analysemethod

### InspectTypes

检测项目的类别（大类），如“水（含大气降水）和废水”，“土壤、水系沉积物”

### ItemName

检测项目的名称，如铜、化学需氧量

### Unit

单位，如mg/L、ug/L

### DecimalDigits

检测结果保留的小数位数

### SignificantFigure

？？？

### LowLimit

检出限

### isincludeLowLimit

是否有检出限

### UpLimit

最大检出限

### IsIncludeUpLimit

是否有最大检出限

### Condition

条件？？

### Remark

备注

### AnalyseFormID

分析表单的ID，对应数据表setting_analyseform，记录了表单模板的名称，用于加载自定义表单

### Wavelength

波长，某些元素的测定波长

### AuditUserStr

审查者的ID，对应数据表fx_userinfo，记录了每个用户的信息

### ExhaustUsefor

???

### ParalelErrorRange

相对误差的范围

### IsRemoved

是否移除？

### SerialNo

系列编号？

### LastMethodID

？

### CertificationUserStr

？

### MethodID_Prev

？

### PickMethodID

采样标准方法的ID，对应数据表？

### DefaultUsed

?

### OrgID

?













