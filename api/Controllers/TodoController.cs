using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    public class TodoController : Controller
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("/todo")]
        public async Task<IActionResult> Index()
        {
            var todos = await _context.Todos.ToListAsync();
            return Ok(todos);
        }

        [HttpGet("/todo/details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            return todo != null ? Ok(todo) : NotFound();
        }

        [HttpPost("/todo/create")]
        public async Task<IActionResult> Create([FromBody] TodoItem todo)
        {
            if (todo == null)
                return BadRequest("Todo item cannot be null");

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Details), new { id = todo.Id }, todo);
        }

        [HttpPut("/todo/edit/{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] TodoItem todo)
        {
            if (id != todo.Id)
                return BadRequest("ID mismatch");

            var exists = await _context.Todos.AnyAsync(t => t.Id == id);
            if (!exists)
                return NotFound();

            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("/todo/delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Todos.FindAsync(id);

            if (item == null)
                return NotFound();

            _context.Todos.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
