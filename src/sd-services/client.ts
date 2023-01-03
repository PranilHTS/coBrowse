let instance = null;
//CORE_REFERENCE_IMPORTS
//append_imports_start

import { StatusCodes as httpStatusCodes } from 'http-status-codes'; //_splitter_
import * as cookieParser from 'cookie-parser'; //_splitter_
import { Readable } from 'stream'; //_splitter_
import { setInterval } from 'timers'; //_splitter_
import { Issuer, custom } from 'openid-client'; //_splitter_
import * as crypto from 'crypto'; //_splitter_
import * as url from 'url'; //_splitter_
import { SDBaseService } from '../services/SDBaseService'; //_splitter_
import { Middleware } from '../middleware/Middleware'; //_splitter_
import * as settings from '../config/config'; //_splitter_
import log from '../utils/Logger'; //_splitter_
import { Subject } from 'rxjs'; //_splitter_
import { Server } from 'socket.io'; //_splitter_
import { v4 as uuidv4 } from 'uuid'; //_splitter_
import { MongoClient } from 'mongodb'; //_splitter_
import { createAdapter } from '@socket.io/mongo-adapter'; //_splitter_
//append_imports_end
export class client {
  public mongoConfig: any;
  private sdService = new SDBaseService();
  private app;
  private serviceBasePath: string;
  private generatedMiddlewares: Object;
  private serviceName: string;

  private globalTimers: any;
  private constructor(
    app,
    generatedeMiddlewares,
    routeCall,
    middlewareCall,
    globalTimers
  ) {
    this.htsCobrowseSocketCode();

    this.serviceName = 'client';
    this.app = app;
    this.serviceBasePath = this.app.settings.base;
    this.generatedMiddlewares = generatedeMiddlewares;
    this.globalTimers = globalTimers;
  }

  static getInstance(
    app?,
    generatedeMiddlewares?,
    routeCall?,
    middlewareCall?,
    globalTimers?
  ) {
    if (!instance) {
      instance = new client(
        app,
        generatedeMiddlewares,
        routeCall,
        middlewareCall,
        globalTimers
      );
    }
    instance.mountCalls(routeCall, middlewareCall);
    return instance;
  }

  private mountCalls(routeCall, middlewareCall) {
    if (routeCall) {
      this.mountAllPaths();
      this.mountAllListeners();
    }
    if (middlewareCall) {
      this.generatedMiddlewares[this.serviceName] = {};
      this.mountAllMiddlewares();
      this.mountTimers();
    }
  }

  async mountAllListeners() {
    try {
      //append_listeners
    } catch (e) {
      throw e;
    }
  }

  async mountTimers() {
    try {
      //appendnew_flow_client_TimerStart
    } catch (e) {
      throw e;
    }
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: client');

    //appendnew_flow_client_MiddlewareStart
  }
  private mountAllPaths() {
    log.debug('mounting all paths for service :: client');
    //appendnew_flow_client_HttpIn
  }
  //   service flows_client

  async sd_WEPBrocm8uFq6Yto(...others) {
    try {
      var bh: any = {
        input: {},
        local: {},
      };
      bh = this.sdService.__constructDefault(bh);
      bh = await this.sd_AXlif8SJU5uH8sRD(bh);
      //appendnew_next_sd_WEPBrocm8uFq6Yto
      return (
        // formatting output variables
        {
          input: {},
          local: {},
        }
      );
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_WEPBrocm8uFq6Yto');
    }
  }

  //appendnew_flow_client_start

  async sd_AXlif8SJU5uH8sRD(bh) {
    try {
      //appendnew_next_sd_AXlif8SJU5uH8sRD
      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_AXlif8SJU5uH8sRD');
    }
  }

  //appendnew_node

  async errorHandler(bh, e, src) {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;

    if (
      false
      /*appendnew_next_Catch*/
    ) {
      return bh;
    } else {
      if (bh.web.next) {
        bh.web.next(e);
      } else {
        throw e;
      }
    }
  }
  //appendnew_flow_client_Catch

  htsCobrowseSocketCode() {
    this.mongoConfig = this.sdService.getConfigObj(
      'df8baa37-b9dc-5a10-c255-00d09a423052',
      'sd_buz1wmsu8stssAmD'
    );
    this.mongoConfig.mongoCollectionName = 'HTSCobrowsePluginData';
    this.getDatabaseSubscriber('insert').then(async (databaseInserter) => {
      let db;
      let dbName;
      let databaseClient;
      if (false) {
        databaseClient = new MongoClient(this.mongoConfig.mongoDatabaseURL);
        dbName = this.mongoConfig.mongoDatabaseName;
        await databaseClient.connect();
        db = databaseClient.db(dbName);
      }
      this.getDatabaseSubscriber('update').then((databaseUpdater) => {
        let latestData = {};
        const io = new Server({
          cors: {
            origin: '*',
            methods: ['GET', 'POST'],
          },
        });
        io.on('connection', (client) => {
          console.log('connected');
          client.on('idDataRequest', (formData) => {
            let clientId = uuidv4();
            client.on('disconnect', () => {
              io.emit(clientId, 'editorDisconnect');
            });
            if (databaseInserter) {
              databaseInserter.next({
                _id: clientId,
                formData: [],
                createdAt: new Date(),
              });
              this.addAnalyticsCode(formData, clientId, db);
            }
            client.emit('idData', clientId);
            client.on(clientId, (data) => {
              latestData[clientId] = data;
              if (databaseUpdater) {
                databaseUpdater.next({
                  value: data,
                  sessionId: clientId,
                  time: new Date().getTime(),
                });
              }
              io.emit(clientId, data);
            });
          });
          client.on('reEstablishClientId', (clientId) => {
            client.on(clientId, (data) => {
              latestData[clientId] = data;
              io.emit(clientId, data);
            });
          });
          client.on('latestDataRequest', (clientId) => {
            if (latestData[clientId]) {
              io.emit(clientId, latestData[clientId]);
            } else {
              io.emit(clientId, {});
            }
          });

          if (false) {
            const collection = db.collection(
              this.mongoConfig.mongoCollectionName
            );
            client.on('replaySession', async (replaySessionData) => {
              const filteredDocs = await collection
                .find({ _id: replaySessionData.clientId })
                .toArray();
              for (
                let index = 0;
                index < filteredDocs[0].formData.length;
                index++
              ) {
                io.emit(
                  replaySessionData.coBrowseEventToListen,
                  filteredDocs[0].formData[index].value
                );
                await new Promise((resolve) =>
                  setTimeout(resolve, replaySessionData.delayTime)
                );
              }
            });
            client.on('CoBrowseAnalyticsDataSend', async (analyticsData) => {
              const analyticsCollection = db.collection(
                'HTSCobrowseAnalyticsInfo'
              );
              analyticsCollection.updateOne(
                { _id: analyticsData._id },
                { $set: { sessionAnalytics: analyticsData } }
              );
            });
            client.on('CoBrowseStartTimeSend', async (coBrowseStartData) => {
              const analyticsCollection = db.collection(
                'HTSCobrowseAnalyticsInfo'
              );
              const filteredDocs = await analyticsCollection
                .find({ _id: coBrowseStartData.sessionId })
                .toArray();
              if (
                filteredDocs[0] &&
                filteredDocs[0].sessionAnalytics &&
                filteredDocs[0].sessionAnalytics.sessionStartTime &&
                filteredDocs[0].coBrowseStartTime === 0
              ) {
                analyticsCollection.updateOne(
                  { _id: coBrowseStartData.sessionId },
                  {
                    $set: {
                      coBrowseStartTime:
                        coBrowseStartData.coBrowseStartTime -
                        filteredDocs[0].sessionAnalytics.sessionStartTime,
                    },
                  }
                );
              }
            });
            client.on('CoBrowseAnalyticsDataGet', async (formId) => {
              const analyticsCollection = db.collection(
                'HTSCobrowseAnalyticsInfo'
              );
              const estimate = await analyticsCollection.db.collection
                .find({ formId: formId })
                .count();
              const monthlySessions = analyticsCollection.aggregate([
                { $match: { formId: formId } },
                {
                  $group: {
                    _id: { $month: '$createdAt' },
                    numberofSessions: { $sum: 1 },
                  },
                },
              ]);
              let monthlySessionData = [];
              for await (const doc of monthlySessions) {
                monthlySessionData.push(doc);
              }

              const sessionTotalTime = analyticsCollection.aggregate([
                { $match: { formId: formId } },
                {
                  $group: {
                    _id: null,
                    sessionTimeSum: {
                      $sum: '$sessionAnalytics.sessionTotalTime',
                    },
                  },
                },
              ]);
              let sessionTotalTimeData;
              for await (const doc of sessionTotalTime) {
                sessionTotalTimeData = doc;
              }
              const allInputNames = await analyticsCollection.distinct(
                'inputNames'
              );
              let allInputNamesData = [];
              const fieldStatistics = [];
              for await (const doc of allInputNames) {
                let fieldData = { fieldName: doc, statistics: '' };
                let fieldDataStatistics = await analyticsCollection.aggregate([
                  { $match: { formId: formId } },
                  {
                    $group: {
                      _id: null,
                      fieldTotalTime: {
                        $avg: '$sessionAnalytics.' + doc + '.totalTime',
                      },
                    },
                  },
                ]);
                for await (const doc of fieldDataStatistics) {
                  fieldData.statistics = doc;
                }
                fieldStatistics.push(fieldData);
                allInputNamesData.push(doc);
              }
              const coBrowseStartAvgTime = analyticsCollection.aggregate([
                { $match: { formId: formId } },
                {
                  $group: {
                    _id: null,
                    coBrowseStartAvgTime: {
                      $sum: '$coBrowseStartTime',
                    },
                  },
                },
              ]);
              let coBrowseStartAvgTimeData;
              for await (const doc of coBrowseStartAvgTime) {
                coBrowseStartAvgTimeData = doc;
              }
              io.emit('adminData', {
                estimate,
                monthlySessionData,
                sessionTotalTimeData,
                allInputNamesData,
                fieldStatistics,
                coBrowseStartAvgTimeData,
              });
            });
          }

          client.on('disconnect', () => {});
        });
        io.listen(3000);
      });
    });
  }

  async getDatabaseSubscriber(type) {
    if (false) {
      const client = new MongoClient(this.mongoConfig.mongoDatabaseURL);
      const dbName = this.mongoConfig.mongoDatabaseName;
      await client.connect();
      const db = client.db(dbName);
      try {
        let mongoCollection = await db.createCollection(
          this.mongoConfig.mongoCollectionName
        );
        await mongoCollection.createIndex(
          { createdAt: 1 },
          {
            expireAfterSeconds: this.mongoConfig.expireAfterSeconds,
            background: true,
          }
        );
      } catch (err) {
        if (!err.message.includes('already exists')) {
          throw err;
        }
      }
      try {
        let mongoCollection = await db.createCollection(
          'HTSCobrowseAnalyticsInfo'
        );
      } catch (err) {
        if (!err.message.includes('already exists')) {
          throw err;
        }
      }
      const collection = db.collection(this.mongoConfig.mongoCollectionName);
      return this.getMongoSubscriber(type, collection);
    } else {
      return false;
    }
  }

  getMongoSubscriber(type, collection) {
    if (false) {
      let mongoDBSubscriber = new Subject();
      if (type === 'update') {
        if (this.mongoConfig.saveEveryKeyStroke) {
          mongoDBSubscriber.subscribe((data: any) => {
            collection.updateOne(
              { _id: data.sessionId },
              { $push: { formData: { value: data.value, time: data.time } } }
            );
          });
        } else {
          mongoDBSubscriber.subscribe((data: any) => {
            collection.updateOne(
              { _id: data.sessionId },
              { $set: { formData: [{ value: data.value, time: data.time }] } }
            );
          });
        }
      } else {
        mongoDBSubscriber.subscribe((data) => {
          collection.insertOne(data);
        });
      }

      return mongoDBSubscriber;
    } else {
      return false;
    }
  }

  async addAnalyticsCode(formData, clientId, db) {
    const collection = db.collection('HTSCobrowseAnalyticsInfo');
    collection.insertOne({
      formId: formData.functionName,
      inputNames: formData.inputNames,
      _id: clientId,
      createdAt: new Date(),
      coBrowseStartTime: 0,
    });
  }
}
