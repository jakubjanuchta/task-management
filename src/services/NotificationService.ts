import { BehaviorSubject, Subject } from 'rxjs';

type ISOString = string

export type Notification = {
    title: string,
    message: string,
    date: ISOString,
    priority: 'low'|'medium'|'high',
    read: boolean
    };

const initialNotifications: Notification[] = [];

class NotificationService {
  notificationsSubject = new BehaviorSubject(initialNotifications);
  unreadCountSubject = new BehaviorSubject(0);
  highPrioritySubject = new Subject();

  send(notification: Notification) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);

    if (!notification.read) {
      this.unreadCountSubject.next(this.unreadCountSubject.getValue() + 1);
    }

    if (notification.priority === 'medium' || notification.priority === 'high') {
      this.highPrioritySubject.next(notification);
    }
  }

  list() {
    return this.notificationsSubject.asObservable();
  }

  unreadCount() {
    return this.unreadCountSubject.asObservable();
  }

  highPriorityNotifications() {
    return this.highPrioritySubject.asObservable();
  }

  markAsRead(notification: Notification) {
    const updatedNotifications = this.notificationsSubject.getValue().map(n =>
      n === notification ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(updatedNotifications);
    this.unreadCountSubject.next(
      this.unreadCountSubject.getValue() - (notification.read ? 0 : 1)
    );
  }
}

export default new NotificationService();