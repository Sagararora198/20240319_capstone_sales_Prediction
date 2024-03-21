import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
import statsmodels.api as sm
from pandas.tseries.offsets import DateOffset
import json
# Function to perform the adfuller test
def adfuller_test(sales):
    result = adfuller(sales)
    labels = ['ADF Test Statistic', 'p-value', '#Lags Used', 'Number of Observations Used']
    for value, label in zip(result, labels):
        print(label + ' : ' + str(value))
    if result[1] <= 0.05:
        print("strong evidence against the null hypothesis(Ho), reject the null hypothesis. Data has no unit root and is stationary")
    else:
        print("weak evidence against null hypothesis, time series has a unit root, indicating it is non-stationary ")

# Assuming the first argument is the script name, the second is the file path, and the third and fourth are the column names
# file_path = sys.argv[1]
# date_column = sys.argv[2]
# sales_column = sys.argv[3]
# print(sys.args[1])


# Read the CSV file
# import os
# print("Current Working Directory:", os.getcwd())
df = pd.read_csv('uploads/perrin-freres-monthly-champagne-.csv')

# Keep only the specified columns and drop rows with any null values
# df = df[[date_column, sales_column]].dropna()

# Rename columns for consistency
df.columns = ["Month", "Sales"]
## Drop last 2 rows
df.drop(106,axis=0,inplace=True)
df.drop(105,axis=0,inplace=True)
# Convert Month into Datetime and set it as index
# df['Month'] = pd.to_datetime(df['Month'])
# df.set_index('Month', inplace=True)
# df.index = pd.DatetimeIndex(df.index).to_period('M') 

# Perform adfuller test
df['Seasonal First Difference'] = df['Sales'] - df['Sales'].shift(12)
# adfuller_test(df['Seasonal First Difference'].dropna())

# SARIMAX model
# model = sm.tsa.statespace.SARIMAX(df['Sales'], order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
# results = model.fit()

# Forecasting
# future_dates = [df.index[-1] + DateOffset(months=x) for x in range(0, 24)]
# future_datest_df = pd.DataFrame(index=future_dates[1:], columns=df.columns)
# future_df = pd.concat([df, future_datest_df])
# future_df['forecast'] = results.predict(start=104, end=120, dynamic=True)
# return future_df['forecast']
# future_df[['Sales', 'forecast']].plot(figsize=(12, 8))
# plt.show()
# Assuming future_df is your DataFrame with the forecasted values
# Convert the index (which is of type Timestamp) to string
# predictions = {date.strftime('%Y-%m-%d'): value for date, value in future_df['forecast'].dropna().items()}

# Convert the predictions to JSON and print
# print(json.dumps(predictions))
print("Done")