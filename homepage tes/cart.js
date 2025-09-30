
/*! MyShoester Simple Cart (localStorage) */
(function(window, document){
  const STORAGE_KEY = 'ms_cart_v1';
  function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ return []; } }
  function save(items){ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); updateBadge(); }
  function findIndex(items, id){ return items.findIndex(x => x.id === id); }
  function currency(n){ return (n).toFixed(2).replace('.', ',') + ' €'; }
  function add(item){ const items = load(); const i = findIndex(items, item.id);
    if(i >= 0){ items[i].qty += item.qty || 1; } else { items.push({ id:item.id, name:item.name, price:+item.price, qty:item.qty||1 }); } save(items); }
  function setQty(id, qty){ const items = load(); const i = findIndex(items, id);
    if(i >= 0){ items[i].qty = Math.max(0, parseInt(qty||0,10)); if(items[i].qty === 0) items.splice(i,1); save(items); } }
  function remove(id){ const items = load().filter(x => x.id !== id); save(items); }
  function clear(){ save([]); }
  function totals(){ const items = load(); const sum = items.reduce((s,x)=> s + x.price * x.qty, 0); const qty = items.reduce((s,x)=> s + x.qty, 0); return {sum, qty, items}; }
  function updateBadge(){ const el = document.getElementById('cartQty'); if(!el) return; el.textContent = totals().qty; }
  function bindAddButtons(root){
    (root || document).querySelectorAll('[data-add-to-cart]')?.forEach(btn => {
      btn.addEventListener('click', function(){
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const qty = parseInt(this.getAttribute('data-qty') || '1', 10);
        add({id, name, price, qty});
        this.disabled = true; setTimeout(()=>{ this.disabled = false; }, 300);
      });
    });
  }
  window.MSCart = { load, save, add, setQty, remove, clear, totals, updateBadge, bindAddButtons, currency };
  document.addEventListener('DOMContentLoaded', function(){ updateBadge(); bindAddButtons(); });
})(window, document);
