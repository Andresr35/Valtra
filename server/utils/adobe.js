const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const Stream = require('stream');
//
//where im gonna store the pdf???
const pdfStream = new Stream.Writable();

const credentials =  PDFServicesSdk.Credentials
.serviceAccountCredentialsBuilder()
.fromFile("pdfservices-api-credentials.json")
.build();

  // Setup input data for the document merge process.
  const jsonStringex = "{\"author\": \"Kane Miller\", \"zip\": 100}",
      jsonDataForMerge = JSON.parse(jsonStringex);

  const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

module.exports = {
    getOrder:   async(jsonString = jsonDataForMerge) =>{
        try{       
            const documentMerge = PDFServicesSdk.DocumentMerge,
            documentMergeOptions = documentMerge.options,
            options = new documentMergeOptions.DocumentMergeOptions(jsonString, documentMergeOptions.OutputFormat.PDF);//putting in that json
            const documentMergeOperation = documentMerge.Operation.createNew(options);
            const input = PDFServicesSdk.FileRef.createFromLocalFile('./utils/PurchaseOrderLMTemplate.docx');//where i store that one file
            documentMergeOperation.setInput(input);

            await documentMergeOperation.execute(executionContext)
            .then (result =>   result.saveAsFile('documentMergeOutput.pdf'))
           // .then(result => result.writeToStream(pdfStream))
            .catch(err => {
                if(err instanceof PDFServicesSdk.Error.ServiceApiError
                    || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                    console.log('Exception encountered while executing operation', err);
                } else {
                    console.log('Exception encountered while executing operation', err);
                }
            });


            return input;
        }catch(err){
            console.log("did not return input, error")
            console.log(err);
            return err;
        }



    },
}

