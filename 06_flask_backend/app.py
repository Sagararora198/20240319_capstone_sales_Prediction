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
# from sklearn.metrics import mean_squared_error
# from math import sqrt
# from sklearn import metrics
# from passlib.hash import  pbkdf2_sha256
# import warnings
from statsmodels.tools.sm_exceptions import ConvergenceWarning
# warnings.simplefilter('ignore', ConvergenceWarning)


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
        forecast_json = forecast_df.to_json(date_format='iso', orient='split')

        # Return the JSON data
        return jsonify(forecast_json)  
    # from pandas.tseries.offsets import DateOffset
    # future_dates=[df.index[-1]+ DateOffset(months=x)for x in range(0,24)]
    # future_datest_df=pd.DataFrame(index=future_dates[1:],columns=df.columns)
    # future_df=pd.concat([df,future_datest_df])
    # future_df['forecast'] = results.predict(start = 104, end = 120, dynamic= True)
    
    # print(future_df['forecast'])
    
    return "err"
    # print(request.files['file'])
    # if request.method=="POST":
    #     title=request.form.get('title')
    #     file=request.files['file']
    #     predictColumn=request.form.get('predictColumn')
    #     periodicity=request.form.get('periodicity')
    #     numbericalValue=request.form.get('numericalValue')
        
    #     if(periodicity=='Yearly'):
    #         freq='Y'
    #     elif(periodicity=='Monthly'):
    #         freq='M'
    #     elif(periodicity=='Weekly'):
    #         freq='W'
    #     else:
    #         freq='D'

    #     data=pd.read_csv(file, encoding='Latin-1')
    #     to_drop = ['ADDRESS_LINE2','STATE','POSTAL_CODE','TERRITORY','PRODUCT_CODE','CUSTOMER_NAME','PHONE','ADDRESS_LINE1','CITY','CONTACT_LAST_NAME','CONTACT_FIRST_NAME']
    #     data = data.drop(to_drop, axis = 1)
    #     data['STATUS'].unique()
    #     data['STATUS'] = pd.factorize(data.STATUS)[0] + 1
    #     data['PRODUCT_LINE'].unique()
    #     data['PRODUCT_LINE'] = pd.factorize(data.PRODUCT_LINE)[0] + 1
    #     data['COUNTRY'].unique()
    #     data['COUNTRY'] = pd.factorize(data.COUNTRY)[0] + 1
    #     data['DEAL_SIZE'].unique()
    #     data['DEAL_SIZE'] = pd.factorize(data.DEAL_SIZE)[0] + 1
    #     data['ORDER_DATE'] = pd.to_datetime(data['ORDER_DATE'])
    #     df = pd.DataFrame(data)
    #     data.sort_values(by = ['ORDER_DATE'], inplace = True)
    #     data.set_index('ORDER_DATE', inplace = True)
    #     df.sort_values(by = ['ORDER_DATE'], inplace = True, ascending = True)
    #     df.set_index('ORDER_DATE', inplace = True)
    #     new_data = pd.DataFrame(df[predictColumn])
    #     new_data = pd.DataFrame(new_data[predictColumn].resample(freq).mean())
    #     new_data = new_data.interpolate(method = 'linear')

    #     #Method to Checking for Stationary: A stationary process has the property that the mean, variance and autocorrelation structure do not change over time.
    #     train, test, validation = np.split(new_data[predictColumn].sample(frac = 1), [int(.6*len(new_data[predictColumn])), int(.8*len(new_data[predictColumn]))])
    #     print('Train Dataset')
    #     print(train)
    #     print('Test Dataset')
    #     print(test)
    #     print('Validation Dataset')
    #     print(validation)

    #     #SARIMA MODEL
    #     mod = sm.tsa.statespace.SARIMAX(new_data,
    #                             order=(1, 1, 1),
    #                             seasonal_order=(1, 1, 1, 12),
    #                             enforce_invertibility=False)
    #     results = mod.fit()
    #     pred = results.get_prediction()
    #     if(freq=='D'):
    #         pred = results.get_prediction(start=pd.to_datetime('2003-01-06'), dynamic=False)
    #     pred.conf_int()
    #     y_forecasted = pred.predicted_mean
    #     y_truth = new_data[predictColumn]

    #     mse = mean_squared_error(y_truth,y_forecasted)
    #     rmse = sqrt(mse)
    #     mae=metrics.mean_absolute_error(y_forecasted, y_truth)
    #     mape=metrics.mean_absolute_percentage_error( y_truth,y_forecasted)
    #     mape=round(mape*100, 2)
    #     forecast = results.forecast(steps=int(numbericalValue))
    #     forecast = forecast.astype('float')
    #     forecast_df = forecast.to_frame()
    #     forecast_df.reset_index(level=0, inplace=True)
    #     forecast_df.columns = ['PredictionDate', 'PredictedColumn']
    #     print(forecast_df)
    #     frame= pd.DataFrame(forecast_df)
    #     frameDict=frame.to_dict('records')
        
    #     predicted_date=[]
    #     predicted_column=[]
    #     for i in range(0,len(frameDict)):
    #         predicted_column.append(frameDict[i]['PredictedColumn'])
    #         tempStr=str(frameDict[i]['PredictionDate'])
    #         dt = parser.parse(tempStr)
    #         predicted_date.append(dt.strftime('%A')[0:3]+', '+str(dt.day)+' '+dt.strftime("%b")[0:3]+' '+str(dt.year))    
    #     if(account.find_one({'email':email})):
    #             account.update_one({"email":email},
    #                 {
    #                         "$set":{'currentPrediction':{
    #                                 "mae":mae, "mape":mape,"mse":mse,"predictedColumn":predicted_column,"predictedDate":predicted_date,"rmse":rmse,"title":title,"predictedColumnName":'Predicted '+predictColumn.lower(),"columnName":predictColumn.capitalize(),"periodicity":periodicity,"numericalValue":numbericalValue
    #                         }
    #                                 },
                            
                            
    #                 })


    #     prediction =frame.to_csv('../client/src/assets/file/prediction.csv',index=False)
    #     dfd = pd.read_csv('../client/src/assets/file/prediction.csv')
    #     return jsonify(data="Predicted")


if __name__=="__main__":
    app.run(debug=True)