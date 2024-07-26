POST http://localhost:8080/api/v1/account/{accountId}
```
{
    accountType,
    balanceCurrencyCode
}
```
POST http://localhost:8080/api/v1/account/{accountId}/debit
```
{
    amount,
    currencyCode
}
```
POST http://localhost:8080/api/v1/account/{accountId}/credit
```
{
    amount,
    currencyCode
}
```
POST http://localhost:8081/api/v1/fees/transaction
```
{
    transactionType,
    amount,
    currencyCode
}
```
POST http://localhost:8082/api/v1/currency/{fromCurrencyCode}/convert
```
{
    amount,
    toCurrencyCode
}
```

| Consumer/Downstream | Producer/Upstream |
| --- | --- |
| POST http://localhost:8080/api/v1/account/{accountId} | |
| POST http://localhost:8080/api/v1/account/{accountId}/debit | POST http://localhost:8081/api/v1/fees/transaction |
| POST http://localhost:8080/api/v1/account/{accountId}/debit | POST http://localhost:8082/api/v1/currency/{fromCurrencyCode}/convert |
| POST http://localhost:8080/api/v1/account/{accountId}/credit | POST http://localhost:8081/api/v1/fees/transaction |
| POST http://localhost:8080/api/v1/account/{accountId}/credit | POST http://localhost:8082/api/v1/currency/{fromCurrencyCode}/convert |
| POST http://localhost:8081/api/v1/fees/transaction | |
| POST http://localhost:8082/api/v1/currency/{fromCurrencyCode}/convert | |