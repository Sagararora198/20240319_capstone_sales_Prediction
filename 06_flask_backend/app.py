from contextlib import nullcontext
import datetime
from functools import wraps
from http.client import HTTPException
from flask import Flask,request,jsonify,session
import json
from flask_cors import CORS
from pandas.tseries.offsets import DateOffset, Day, Week, MonthEnd, YearEnd
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import pymongo
from pylab import rcParams
import statsmodels.api as sm
from dateutil import parser

from statsmodels.tools.sm_exceptions import ConvergenceWarning



mongoDB=pymongo.MongoClient('mongodb+srv://root:root@cluster0.rebho1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db=mongoDB['sales_prediction']


app=Flask(__name__)
CORS(app)


            
@app.route("/getPredictions",methods=["GET"])
def getPrediction():
    fileTitle = request.args.get('fileTitle')
    
    print(fileTitle)
    collection = db['sales']
    documents = collection.find_one({"fileTitle":fileTitle})
    if documents:
        path = documents.get('filePath')
        periodicity = documents.get('periodicity')
        dateColumn = documents.get('dateColumn')
        print(periodicity)
        print(path)
        print(dateColumn)
        salesColumn = documents.get('predictColumn')
        shiftUnit = 1
        date_offset = MonthEnd()
        if(periodicity=="monthly"):
            shiftUnit = 12
            date_offset = MonthEnd()
        elif(periodicity=='weekly'):
            shiftUnit=7
            date_offset = Week()
        elif(periodicity=='yearly'):
            shiftUnit = 12
            date_offset = YearEnd()
        else:
            shitUnit = 1   
            date_offset = Day()         
            
    
    
        df=pd.read_csv(f"E:/TrainingGitManagement/20240319_capstone_sales_Prediction/05_express_backend/{path}")
        df = df[[dateColumn,salesColumn ]].dropna()
        df.columns=["Date","Sales"]
        df['Date']=pd.to_datetime(df['Date'])
        df.set_index('Date',inplace=True)
        df['Seasonal First Difference']=df['Sales']-df['Sales'].shift(shiftUnit)
        model=sm.tsa.statespace.SARIMAX(df['Sales'],order=(1, 1, 1),seasonal_order=(1,1,1,shiftUnit))
        results=model.fit()
        future_periods = 10
        forecast = results.forecast(steps=future_periods)
        future_dates = [df.index[-1] + date_offset * x for x in range(1, future_periods + 1)]
        forecast_df = pd.DataFrame(forecast.values, index=future_dates, columns=['PredictedSales'])
        # Convert the forecast DataFrame to a JSON-friendly format
        
        forecast_list = [
            {"date": date.strftime('%Y-%m-%d'), "PredictedSales": value}
        for date, value in zip(forecast_df.index, forecast_df['PredictedSales'])
        ]

        # Convert the list of dictionaries to JSON
        forecast_json = json.dumps(forecast_list)

        # Return the JSON data
        return jsonify(forecast_json)
        # forecast_json = forecast_df.to_json(date_format='iso', orient='split')

      
    
    return "err"
    

if __name__=="__main__":
    app.run(debug=True)