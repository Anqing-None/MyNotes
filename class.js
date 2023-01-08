class Sample {
  constructor() {
    this.SecondCode = ''
    this.Value = ''
  }

  getKBSample() {
    return {
      SecondCode: 'KB',
      Value: ''
    }
  }
}

const sample = new Sample();
const KBSample = sample.getKBSample();

