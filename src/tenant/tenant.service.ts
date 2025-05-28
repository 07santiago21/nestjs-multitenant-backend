import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';
import { MongoClient, Db, Collection } from 'mongodb';

@Injectable()
export class TenantService implements OnModuleDestroy {
  private client: MongoClient;
  private dbMap: Map<string, Db> = new Map();
  private isConnected = false;

  constructor(private configService: ConfigService) {
    const uri = this.configService.get<string>('MONGO_URI');
    this.client = new MongoClient(uri);
  }

  async getDb(tenantId: string): Promise<Db> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }

    if (this.dbMap.has(tenantId)) {
      return this.dbMap.get(tenantId);
    }

    const db = this.client.db(tenantId);
    this.dbMap.set(tenantId, db);
    return db;
  }

  async getCollection<T=any>(collectionName: string,tenantId: string): Promise <Collection<T>> {
    
    const db = await this.getDb(tenantId);
    //TODO: verificar que la coleccion exista
    return db.collection<T>(collectionName);

  }

  async onModuleDestroy() {
    await this.client.close();
  }
}