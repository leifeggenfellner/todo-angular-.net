using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        // GET: api/todo
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todos = await _context.Todos.ToListAsync();
            return Ok(todos);
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            return todo != null ? Ok(todo) : NotFound();
        }

        // POST: api/todo
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoItem todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = todo.Id }, todo);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TodoItem todo)
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

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
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
