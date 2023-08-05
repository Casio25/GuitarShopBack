/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';
import * as nodemailer from 'nodemailer';
import { RandomSymbols } from '../../../data/util';
import {ICreateOrder} from "../../../utils/interface/orderInterface"
import {IMailOption} from "../../../utils/interface/mailInterface"
// import { createOrder } from './order.data-service';
import { OrderDataService } from './orderData.service';
import * as fs from 'fs';







@Injectable()
export class OrderService {
  private orders: CreateOrderDto[] = [];
  constructor (private orderDataService: OrderDataService){}

  createOrder(createOrderDto: ICreateOrder) {
    this.orders.push(createOrderDto);
    createOrderDto.orderId = this.randomOrder(createOrderDto.date);
    this.saveOrderToFile(createOrderDto);
    this.orderDataService.Test();
    // this.orderDataService.createOne(createOrderDto)
    this.sendEmail(createOrderDto.orderId, createOrderDto.userEmail)
      .then(() => {
        console.log('Order created and email sent successfully');
      })
      .catch((error) => {
        console.log('Order created, but email sending failed:', error);
      });

    return createOrderDto;
  }

  private saveOrderToFile(order: ICreateOrder): void {
    const orderData = JSON.stringify(order) + '\n';
    fs.appendFileSync('order.txt', orderData);
  }

  private randomOrder(date: string): string {
    const randomOrderSymbols = RandomSymbols();
    const generatedOrders = new Set();
    let order = '';

    do {
      order = `${randomOrderSymbols} / ${date}`;
    } while (generatedOrders.has(order));
    generatedOrders.add(order);

    return order;
  }

  private sendEmail(orderId: string, userEmail: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mishakolomiets355@gmail.com',
          pass: 'jtkrcyyvszokkbqz',
        },
      });

      const mailOptions: IMailOption = {
        from: 'mishakolomietsus@gmail.com',
        to: userEmail,
        subject: 'Order Confirmation',
        text: `Your order with ID ${orderId} has been confirmed.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          reject(error);
        } else {
          console.log('Email sent:', info.response);
          resolve();
        }
      });
    });
  }
}

// rename CreateOrderDto to Order


