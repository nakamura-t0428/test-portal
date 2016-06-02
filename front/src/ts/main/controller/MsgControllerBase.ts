export class MsgControllerBase {
  message = '';
  sending = false;

  hasMessage():boolean {
    return this.message && this.message.length > 0;
  }
  
  protected begin():void {
    this.message = '';
    this.sending = true;
  }
  protected finish():void {
    this.sending = false;
  }
}
