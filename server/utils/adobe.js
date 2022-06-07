// Get the samples from http://www.adobe.com/go/pdftoolsapi_node_sample
// Run the sample:
// node src/documentmerge/merge-document-to-docx.js

const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

try {
  // Initial setup, create credentials instance.
  const credentials =  PDFServicesSdk.Credentials
      .serviceAccountCredentialsBuilder()
      .fromFile("pdfservices-api-credentials.json")
      .build();

  // Setup input data for the document merge process.
  const jsonString = "{\"author\": \"Kane Miller\", \"zip\": 100}",
      jsonDataForMerge = JSON.parse(jsonString);

  // Create an ExecutionContext using credentials.
  const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

  // Create a new DocumentMerge options instance.
  const documentMerge = PDFServicesSdk.DocumentMerge,
      documentMergeOptions = documentMerge.options,
      options = new documentMergeOptions.DocumentMergeOptions(jsonDataForMerge, documentMergeOptions.OutputFormat.PDF);

  // Create a new operation instance using the options instance.
  const documentMergeOperation = documentMerge.Operation.createNew(options);

  // Set operation input document template from a source file.
  const input = PDFServicesSdk.FileRef.createFromLocalFile('./utils/PurchaseOrderLMTemplate.docx');
  documentMergeOperation.setInput(input);

  // Execute the operation and Save the result to the specified location.
  documentMergeOperation.execute(executionContext)
     // .then(result => result.saveAsFile('documentMergeOutput.pdf'))
      .then(result => console.dir(result))
      .catch(err => {
          if(err instanceof PDFServicesSdk.Error.ServiceApiError
              || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
              console.log('Exception encountered while executing operation', err);
          } else {
              console.log('Exception encountered while executing operation', err);
          }
      });
}
catch (err) {
    console.log('Exception encountered while executing operation', err);
}
module.exports = {result}