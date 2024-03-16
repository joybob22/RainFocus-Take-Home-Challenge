export default class RFEvent {
  id?: string;
  color: string;
  isActive: boolean;
  name: string;
  date: string;
  time: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  image: string;
  createdOn: Date;

  [key: string]: any;

  constructor(
    color: string,
    isActive: boolean = false,
    name: string,
    date: string,
    time: string,
    company: string,
    email: string,
    phone: string,
    address: string,
    description: string,
    image: string,
    createdOn: Date,
    id?: string
  ) {
    this.id = id;
    this.color = color;
    this.isActive = isActive;
    this.name = name;
    this.date = date;
    this.time = time;
    this.company = company;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.description = description;
    this.image = image;
    this.createdOn = createdOn;
  }
}
