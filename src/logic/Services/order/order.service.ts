/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/logic/Dto/order/create-order.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OrderService {
  private orders: CreateOrderDto[] = [];

  createOrder(createOrderDto: CreateOrderDto): CreateOrderDto {
    this.orders.push(createOrderDto);

    return createOrderDto;
  }


  sendEmail(orderId: string, userEmail: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Configure Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mishakolomiets355@gmail.com',
          pass: 'jtkrcyyvszokkbqz',
        },
      });

      // Define email message
      const mailOptions = {
        from: 'mishakolomietsus@gmail.com', // Sender address
        to: userEmail, // Recipient address
        subject: 'Order Confirmation', // Email subject
        text: `Your order with ID ${orderId} has been confirmed.`, // Email body
      };

      // Send the email
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
